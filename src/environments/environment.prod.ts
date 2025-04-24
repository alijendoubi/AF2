export const environment = {
  production: true,
  firebase: {
    apiKey: '{{FIREBASE_API_KEY}}',
    authDomain: '{{FIREBASE_AUTH_DOMAIN}}',
    projectId: '{{FIREBASE_PROJECT_ID}}',
    storageBucket: '{{FIREBASE_STORAGE_BUCKET}}',
    messagingSenderId: '{{FIREBASE_MESSAGING_SENDER_ID}}',
    appId: '{{FIREBASE_APP_ID}}'
  },
  emailJs: {
    publicKey: '{{EMAILJS_PUBLIC_KEY}}',
    serviceId: '{{EMAILJS_SERVICE_ID}}',
    welcomeTemplateId: '{{EMAILJS_WELCOME_TEMPLATE_ID}}',
    contactTemplateId: '{{EMAILJS_CONTACT_TEMPLATE_ID}}',
    newsletterTemplateId: '{{EMAILJS_NEWSLETTER_TEMPLATE_ID}}',
    betaSignupTemplateId: '{{EMAILJS_BETA_SIGNUP_TEMPLATE_ID}}'
  }
};

