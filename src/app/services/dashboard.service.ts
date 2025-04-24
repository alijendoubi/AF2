import { Injectable, inject } from '@angular/core';
import { Observable, of, catchError, map } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DashboardStats, SystemHealth, ActivityLog, SystemIssue } from '../interfaces';
import { queryCollection } from '../firebase/firebase-optimizations';
import { Firestore, collection, getDocs, query, orderBy, limit } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private firestore = inject(Firestore);

  /**
   * Get dashboard statistics
   * Uses optimized Firestore queries with fallback to mock data
   */
  getStats(): Observable<DashboardStats> {
    // Try to get real data from Firestore
    try {
      // This is a simplified example - in a real app, you might have a stats collection
      // or calculate these values from multiple collections
      return queryCollection<any>('stats', 'type', '==', 'dashboard').pipe(
        map(results => {
          if (results && results.length > 0) {
            return results[0] as DashboardStats;
          } else {
            // Fallback to mock data if no results
            return this.getMockStats();
          }
        }),
        catchError(() => {
          // Fallback to mock data on error
          return of(this.getMockStats());
        })
      );
    } catch (error) {
      // Fallback to mock data if there's an error
      return of(this.getMockStats()).pipe(delay(800));
    }
  }
  
  /**
   * Get mock statistics for development or when Firestore is unavailable
   */
  private getMockStats(): DashboardStats {
    return {
      totalUsers: 1254,
      activeSubscriptions: 876,
      monthlyRevenue: 45750,
      systemHealth: {
        status: 'healthy',
        uptime: 99.98,
        lastChecked: new Date(),
        issues: []
      }
    };
  }
  
  /**
   * Get system health information
   * In a real application, this would fetch data from a monitoring service
   */
  getSystemHealth(): Observable<SystemHealth> {
    const mockHealth: SystemHealth = {
      status: 'healthy',
      uptime: 99.98,
      lastChecked: new Date(),
      issues: [
        {
          id: '1',
          type: 'warning',
          message: 'High CPU usage detected',
          timestamp: new Date(Date.now() - 3600000) // 1 hour ago
        }
      ]
    };
    
    return of(mockHealth).pipe(delay(600));
  }
  
  /**
   * Get activity logs
   * Uses optimized Firestore queries with fallback to mock data
   */
  getActivityLogs(maxLimit: number = 10): Observable<ActivityLog[]> {
    try {
      const logsCollection = collection(this.firestore, 'activityLogs');
      const logsQuery = query(
        logsCollection,
        orderBy('timestamp', 'desc'),
        limit(maxLimit)
      );
      
      return new Observable<ActivityLog[]>(observer => {
        getDocs(logsQuery)
          .then(snapshot => {
            if (snapshot.empty) {
              // Return mock data if no logs exist
              observer.next(this.getMockLogs(maxLimit));
              observer.complete();
            } else {
              const logs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              } as ActivityLog));
              observer.next(logs);
              observer.complete();
            }
          })
          .catch(error => {
            console.error('Error fetching activity logs:', error);
            // Fallback to mock data on error
            observer.next(this.getMockLogs(maxLimit));
            observer.complete();
          });
      });
    } catch (error) {
      // Fallback to mock data if there's an error
      return of(this.getMockLogs(maxLimit)).pipe(delay(700));
    }
  }
  
  /**
   * Get mock activity logs for development or when Firestore is unavailable
   */
  private getMockLogs(maxLimit: number): ActivityLog[] {
    const mockLogs: ActivityLog[] = [
      {
        id: '1',
        userId: 'user123',
        action: 'Login',
        details: 'User logged in from 192.168.1.1',
        timestamp: new Date(Date.now() - 300000) // 5 minutes ago
      },
      {
        id: '2',
        userId: 'user456',
        action: 'Subscription Updated',
        details: 'Upgraded to Pro plan',
        timestamp: new Date(Date.now() - 1800000) // 30 minutes ago
      },
      {
        id: '3',
        userId: 'user789',
        action: 'Password Changed',
        details: 'User changed their password',
        timestamp: new Date(Date.now() - 7200000) // 2 hours ago
      },
      {
        id: '4',
        userId: 'user123',
        action: 'Profile Updated',
        details: 'User updated their profile information',
        timestamp: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        id: '5',
        userId: 'admin001',
        action: 'System Update',
        details: 'System updated to version 2.1.0',
        timestamp: new Date(Date.now() - 172800000) // 2 days ago
      }
    ];
    
    return mockLogs.slice(0, maxLimit);
  }
  
  /**
   * Get user-specific dashboard data
   * In a real application, this would fetch data specific to the current user
   */
  getUserDashboard(userId: string): Observable<any> {
    const mockUserData = {
      subscription: {
        plan: 'pro',
        status: 'active',
        nextRenewal: new Date(Date.now() + 2592000000), // 30 days from now
        features: ['Unlimited projects', 'Advanced analytics', 'Priority support']
      },
      usage: {
        storage: {
          used: 2.7,
          total: 10,
          unit: 'GB'
        },
        apiCalls: {
          used: 8750,
          total: 10000,
          unit: 'calls'
        }
      },
      recentProjects: [
        { id: 'p1', name: 'Marketing Campaign', lastAccessed: new Date(Date.now() - 86400000) },
        { id: 'p2', name: 'Website Redesign', lastAccessed: new Date(Date.now() - 172800000) },
        { id: 'p3', name: 'Product Launch', lastAccessed: new Date(Date.now() - 259200000) }
      ]
    };
    
    return of(mockUserData).pipe(delay(900));
  }
  
  /**
   * Get admin-specific dashboard data
   * In a real application, this would fetch data only accessible to admins
   */
  getAdminDashboard(): Observable<any> {
    const mockAdminData = {
      userStats: {
        total: 1254,
        active: 876,
        newThisMonth: 124,
        churnRate: 2.3
      },
      subscriptionStats: {
        free: 378,
        basic: 425,
        pro: 321,
        enterprise: 130
      },
      revenueData: [
        { month: 'Jan', revenue: 32500 },
        { month: 'Feb', revenue: 36750 },
        { month: 'Mar', revenue: 38900 },
        { month: 'Apr', revenue: 42300 },
        { month: 'May', revenue: 45750 }
      ]
    };
    
    return of(mockAdminData).pipe(delay(1000));
  }
}
