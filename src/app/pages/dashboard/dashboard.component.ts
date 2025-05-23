import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AuthService, DashboardService } from '../../services';
import { DashboardStats, ActivityLog, SystemHealth } from '../../interfaces';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './templates/dashboard.template.html',
  styles: [`
    :host {
      display: block;
    }
    
    .card {
      transition: transform 0.2s;
    }
    
    .card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);
  
  protected isAdmin = false;
  protected isLoading = true;
  protected userName = '';
  
  // Dashboard data
  protected stats: DashboardStats | null = null;
  protected activityLogs: ActivityLog[] = [];
  protected filteredActivityLogs: ActivityLog[] = [];
  protected activityFilter: string = 'all';
  protected systemHealth: SystemHealth | null = null;
  protected userData: any = null;
  protected adminData: any = null;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Only execute client-side code in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.isAdmin = this.authService.isAdminUser();
      const currentUser = this.authService.getCurrentUser();
      this.userName = currentUser?.displayName || 'User';
      
      this.loadDashboardData();
    } else {
      // Server-side rendering - provide fallback data
      this.isLoading = false;
      this.userName = 'User';
      this.isAdmin = false;
      
      // Provide minimal static data for SSR
      this.stats = {
        totalUsers: 0,
        activeSubscriptions: 0,
        monthlyRevenue: 0,
        systemHealth: {
          status: 'healthy',
          uptime: 99.9,
          lastChecked: new Date(),
          issues: []
        }
      };
      
      this.activityLogs = [];
    }
  }
  
  /**
   * Refresh dashboard data
   * This method is called when the user clicks the refresh button
   */
  protected refreshDashboard(): void {
    this.loadDashboardData();
  }

  /**
   * Filter activity logs based on selected filter
   */
  protected filterActivityLogs(): void {
    if (this.activityFilter === 'all') {
      this.filteredActivityLogs = [...this.activityLogs];
    } else {
      this.filteredActivityLogs = this.activityLogs.filter(log => {
        const action = log.action.toLowerCase();
        switch (this.activityFilter) {
          case 'login':
            return action.includes('login');
          case 'subscription':
            return action.includes('subscription');
          case 'profile':
            return action.includes('profile') || action.includes('password');
          case 'system':
            return action.includes('system');
          default:
            return true;
        }
      });
    }
  }
  
  /**
   * Clear all activity logs
   */
  protected clearActivityLogs(): void {
    // In a real application, this would call a service method to clear logs
    // For now, we'll just clear the local arrays
    this.activityLogs = [];
    this.filteredActivityLogs = [];
  }

  private async loadDashboardData(): Promise<void> {
    this.isLoading = true;
    
    try {
      // Load common data
      this.dashboardService.getStats().subscribe(stats => {
        this.stats = stats;
      });
      
      this.dashboardService.getActivityLogs().subscribe(logs => {
        this.activityLogs = logs;
        // Initialize filtered logs with all logs
        this.filteredActivityLogs = [...logs];
      });
      
      // Load role-specific data
      if (this.isAdmin) {
        this.dashboardService.getAdminDashboard().subscribe(data => {
          this.adminData = data;
        });
      } else {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser) {
          this.dashboardService.getUserDashboard(currentUser.uid).subscribe(data => {
            this.userData = data;
          });
        }
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      // Simulate loading delay
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }
}
