# AutoFlowOS

![AutoFlowOS](https://img.shields.io/badge/AutoFlowOS-v1.0.0-2696AD)
![Angular](https://img.shields.io/badge/Angular-v19-DD0031)
![Firebase](https://img.shields.io/badge/Firebase-v11-FFCA28)
![License](https://img.shields.io/badge/License-MIT-blue)

**AutoFlowOS** is a comprehensive workflow automation platform designed to streamline business processes, boost productivity, and reduce manual tasks. Built with Angular and Firebase, it offers a modern, responsive interface with powerful automation capabilities.

## 🚀 Features

- **User Authentication & Authorization**
  - Secure email/password authentication
  - Role-based access control (Admin/User)
  - Password reset functionality
  - Email verification

- **Dashboard**
  - Personalized user dashboard
  - Admin dashboard with analytics
  - Activity logging and monitoring
  - System health monitoring

- **Workflow Automation**
  - Intuitive drag-and-drop interface
  - Pre-built automation templates
  - Custom workflow creation
  - Real-time workflow monitoring

- **Analytics & Reporting**
  - Real-time performance metrics
  - Usage statistics
  - Subscription management
  - Revenue tracking (Admin)

- **Internationalization**
  - Multi-language support (English, French)
  - Easy language switching

- **Responsive Design**
  - Mobile-friendly interface
  - Dark/Light theme support
  - Modern UI with Bootstrap 5

## 📋 Prerequisites

- Node.js (v18.x or later)
- npm (v9.x or later)
- Angular CLI (v19.x)

## 🔧 Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/autoflowos.git
cd autoflowos
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure Firebase**

Create a `.env` file in the root directory with your Firebase configuration:

```
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_DATABASE_URL=your-database-url
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_MEASUREMENT_ID=your-measurement-id
```

4. **Configure EmailJS** (for email functionality)

Update the EmailJS configuration in the `.env` file:

```
EMAILJS_PUBLIC_KEY=your-public-key
EMAILJS_SERVICE_ID=your-service-id
EMAILJS_CONTACT_TEMPLATE_ID=your-contact-template-id
EMAILJS_WELCOME_TEMPLATE_ID=your-welcome-template-id
EMAILJS_NEWSLETTER_TEMPLATE_ID=your-newsletter-template-id
EMAILJS_BETA_SIGNUP_TEMPLATE_ID=your-beta-signup-template-id
```

## 🚀 Usage

### Development Server

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

### Building for Production

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Server-Side Rendering

Run the SSR server:

```bash
npm run serve:ssr:AF2
```

### Testing

Run unit tests:

```bash
npm test
```

## 📱 Application Structure

### Key Pages

- **Home**: Landing page with product information
- **Features**: Detailed feature descriptions
- **Mission**: Company mission and values
- **About**: Company information
- **Contact**: Contact form and information
- **Login/Signup**: Authentication pages
- **Dashboard**: User/Admin dashboard
- **Profile**: User profile management
- **Admin Panel**: Admin-only controls

### Core Functionality

- **Authentication**: Firebase Authentication integration
- **Database**: Firestore for data storage
- **Email Services**: EmailJS integration for email functionality
- **Internationalization**: ngx-translate for multi-language support
- **Analytics**: Chart.js for data visualization

## 🔍 Project Structure

```
autoflowos/
├── src/
│   ├── app/
│   │   ├── components/         # Reusable UI components
│   │   ├── firebase/           # Firebase optimizations
│   │   ├── guards/             # Route guards
│   │   ├── interfaces/         # TypeScript interfaces
│   │   ├── layouts/            # Layout components
│   │   ├── pages/              # Page components
│   │   ├── services/           # Service providers
│   │   ├── app.component.ts    # Root component
│   │   ├── app.config.ts       # App configuration
│   │   └── app.routes.ts       # Routing configuration
│   ├── assets/
│   │   ├── i18n/               # Translation files
│   │   └── images/             # Image assets
│   ├── environments/           # Environment configurations
│   └── styles.css              # Global styles
├── angular.json                # Angular configuration
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## 🛠️ Technologies Used

- **Frontend Framework**: Angular 19
- **UI Framework**: Bootstrap 5
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **Storage**: Firebase Storage
- **Internationalization**: ngx-translate
- **Charts**: Chart.js / ng2-charts
- **Email Service**: EmailJS
- **Icons**: Bootstrap Icons
- **Server-Side Rendering**: Angular Universal

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- **Website**: [autoflowos.com](https://autoflowos.com)
- **Email**: info@autoflowos.com
- **Twitter**: [@autoflowos](https://twitter.com/autoflowos)
- **LinkedIn**: [AutoFlowOS](https://linkedin.com/company/autoflowos)

---

© 2025 AutoFlowOS. All rights reserved.
