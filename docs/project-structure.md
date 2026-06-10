# Project Structure

This document describes the complete project structure, focusing on the `src/` directory which contains all the source code for the Shrestha Services application.

## Root Directory

```
shrestha-services/
├── public/              # Static assets (images, favicons, manifest, etc.)
│   ├── images/
│   │   ├── company/
│   │   ├── gallery/
│   │   ├── hero/
│   │   ├── projects/
│   │   ├── services/
│   │   ├── team/
│   │   └── testimonials/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── icons.svg
│   ├── logo.png
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── docs/                # Project documentation
├── src/                 # Source code (detailed below)
├── dist/                # Build output
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## src/ Directory Structure

```
src/
├── assets/                      # Static assets used in components
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── components/                  # Reusable React components
│   ├── admin/                   # Admin panel specific components
│   │   ├── auth/                # Admin auth components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── ResetPasswordForm.tsx
│   │   │   ├── ChangePasswordForm.tsx
│   │   │   └── VerifyOtpForm.tsx
│   │   ├── widgets/             # Dashboard widgets
│   │   │   ├── ActivityTimelineWidget.tsx
│   │   │   ├── ContactChart.tsx
│   │   │   ├── CustomerGrowthWidget.tsx
│   │   │   ├── GalleryStatisticsWidget.tsx
│   │   │   ├── KPIWidget.tsx
│   │   │   ├── MonthlyGrowthWidget.tsx
│   │   │   ├── NotificationWidget.tsx
│   │   │   ├── PendingQuotesWidget.tsx
│   │   │   ├── PrintingVolumeWidget.tsx
│   │   │   ├── QuickActionsWidget.tsx
│   │   │   ├── QuoteChart.tsx
│   │   │   ├── RecentContactsWidget.tsx
│   │   │   ├── RecentOrdersWidget.tsx
│   │   │   ├── RecentProjectsWidget.tsx
│   │   │   ├── RecentQuoteWidget.tsx
│   │   │   ├── RecentTestimonialsWidget.tsx
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── ServicePopularityWidget.tsx
│   │   │   ├── ServicesChart.tsx
│   │   │   ├── TopServicesWidget.tsx
│   │   │   ├── VisitorCard.tsx
│   │   │   └── VisitorsChart.tsx
│   │   ├── AdminNavbar.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── ConfirmDeleteModal.tsx
│   │   ├── DashboardCard.tsx
│   │   ├── DashboardStats.tsx
│   │   ├── DataTable.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── PublicRoute.tsx
│   │   └── RoleGuard.tsx
│   │
│   ├── common/                  # Common UI components
│   │   ├── Breadcrumb.tsx
│   │   ├── Button.tsx
│   │   ├── Checkbox.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── Input.tsx
│   │   ├── Loader.tsx
│   │   ├── Modal.tsx
│   │   ├── PageHeader.tsx
│   │   ├── Pagination.tsx
│   │   ├── Radio.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── Select.tsx
│   │   └── TextArea.tsx
│   │
│   ├── contact/                 # Contact page components
│   │   ├── BusinessHours.tsx
│   │   ├── ContactCTA.tsx
│   │   ├── ContactForm.tsx
│   │   ├── ContactInfo.tsx
│   │   ├── GoogleMap.tsx
│   │   └── SocialLinks.tsx
│   │
│   ├── gallery/                 # Gallery page components
│   │   ├── GalleryCTA.tsx
│   │   ├── GalleryCard.tsx
│   │   ├── GalleryCategories.tsx
│   │   ├── GalleryFilter.tsx
│   │   ├── GalleryGrid.tsx
│   │   ├── GalleryHero.tsx
│   │   └── LightBox.tsx
│   │
│   ├── home/                    # Home page components
│   │   ├── ContactCTA.tsx
│   │   ├── FeaturedServices.tsx
│   │   ├── HeroSection.tsx
│   │   ├── HomeGallery.tsx
│   │   ├── Partners.tsx
│   │   ├── Statistics.tsx
│   │   ├── TestimonialsPreview.tsx
│   │   ├── WhyChooseUs.tsx
│   │   └── WorkProcess.tsx
│   │
│   ├── layout/                  # Layout components
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Navbar.tsx
│   │   ├── PageContainer.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── TopBar.tsx
│   │
│   ├── projects/                # Projects section components
│   │   ├── ProjectOverview.tsx
│   │   ├── ProjectStatistics.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectDetails.tsx
│   │   ├── ProjectGallery.tsx
│   │   ├── ProjectGrid.tsx
│   │   └── RelatedProject.tsx
│   │
│   ├── quote/                   # Quote request components
│   │   ├── CustomerDetails.tsx
│   │   ├── DimensionInput.tsx
│   │   ├── FileUpload.tsx
│   │   ├── QuoteForm.tsx
│   │   ├── QuoteSuccess.tsx
│   │   ├── QuoteSummary.tsx
│   │   └── ServiceSelector.tsx
│   │
│   ├── services/                # Services section components
│   │   ├── RelatedServices.tsx
│   │   ├── ServiceBanner.tsx
│   │   ├── ServiceBenefits.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ServiceDetails.tsx
│   │   ├── ServiceFeatures.tsx
│   │   ├── ServiceGallery.tsx
│   │   └── ServiceGrid.tsx
│   │
│   ├── testimonials/            # Testimonials section components
│   │   ├── CustomerReview.tsx
│   │   ├── RatingStars.tsx
│   │   ├── SuccessStories.tsx
│   │   ├── TestimonialsSlider.tsx
│   │   ├── TestimonialsGrid.tsx
│   │   └── TestimonialCard.tsx
│   │
│   └── ui/                      # UI library components
│       ├── Accordion.tsx
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── Card.tsx
│       ├── Chip.tsx
│       ├── Dialog.tsx
│       ├── Divider.tsx
│       ├── Dropdown.tsx
│       ├── Skeleton.tsx
│       ├── Table.tsx
│       ├── Tabs.tsx
│       └── Tooltip.tsx
│
├── config/                      # Application configuration
│   ├── api.ts
│   ├── app.ts
│   └── env.ts
│
├── constants/                   # Constant values
│   ├── company.ts
│   ├── config.ts
│   ├── contactStatus.ts
│   ├── galleryCategories.ts
│   ├── quoteStatus.ts
│   ├── routes.ts
│   ├── seo.ts
│   ├── services.ts
│   └── userRoles.ts
│
├── context/                     # React Context API
│   ├── AuthContext.tsx
│   ├── NotificationContext.tsx
│   └── ThemeContext.tsx
│
├── data/                        # Static data
│   ├── company.ts
│   ├── faq.ts
│   ├── gallery.ts
│   ├── projects.ts
│   ├── services.ts
│   ├── statistics.ts
│   └── testimonials.ts
│
├── hooks/                       # Custom React hooks
│   ├── useAnalytics.ts
│   ├── useAuth.ts
│   ├── useContacts.ts
│   ├── useDebounce.ts
│   ├── useGallery.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   ├── useNotifications.ts
│   ├── useOrders.ts
│   ├── usePagination.ts
│   ├── useProjects.ts
│   ├── useQuotes.ts
│   ├── useReports.ts
│   ├── useScrollToTop.ts
│   ├── useServices.ts
│   ├── useTestimonials.ts
│   ├── useTheme.ts
│   └── useUsers.ts
│
├── layouts/                     # Layout wrappers
│   ├── AdminLayout.tsx
│   └── MainLayout.tsx
│
├── pages/                       # Page components
│   ├── About/
│   │   └── AboutPage.tsx
│   ├── Admin/
│   │   ├── ActivityLogs/
│   │   │   └── ActivityLogsPage.tsx
│   │   ├── Analytics/
│   │   │   └── AnalyticsPage.tsx
│   │   ├── Auth/
│   │   │   ├── AuthPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── ForgotPasswordPage.tsx
│   │   │   ├── ResetPasswordPage.tsx
│   │   │   ├── ChangePasswordPage.tsx
│   │   │   └── VerifyOtpPage.tsx
│   │   ├── Contacts/
│   │   │   └── ContactsPage.tsx
│   │   ├── Dashboard/
│   │   │   └── DashboardPage.tsx
│   │   ├── Gallery/
│   │   │   └── GalleryPage.tsx
│   │   ├── Notifications/
│   │   │   └── NotificationsPage.tsx
│   │   ├── Orders/
│   │   │   └── OrdersPage.tsx
│   │   ├── Projects/
│   │   │   └── ProjectsPage.tsx
│   │   ├── Quotes/
│   │   │   └── QuotesPage.tsx
│   │   ├── Reports/
│   │   │   └── ReportsPage.tsx
│   │   ├── Services/
│   │   │   └── ServicesPage.tsx
│   │   ├── Settings/
│   │   │   └── SettingsPage.tsx
│   │   ├── Testimonials/
│   │   │   └── TestimonialsPage.tsx
│   │   └── Users/
│   │       └── UsersPage.tsx
│   ├── Blog/
│   │   ├── BlogDetailsPage.tsx
│   │   └── BlogListPage.tsx
│   ├── Careers/
│   │   └── CareersPage.tsx
│   ├── Contact/
│   │   └── ContactPage.tsx
│   ├── Customer/
│   │   ├── DashboardPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── TrackingPage.tsx
│   ├── Error/
│   │   └── ErrorPage.tsx
│   ├── FAQ/
│   │   └── FAQPage.tsx
│   ├── Gallery/
│   │   ├── GalleryCategoryPage.tsx
│   │   └── GalleryPage.tsx
│   ├── Home/
│   │   └── HomePage.tsx
│   ├── Loading/
│   │   └── LoadingPage.tsx
│   ├── NotFound/
│   │   └── NotFoundPage.tsx
│   ├── Privacy/
│   │   └── PrivacyPolicyPage.tsx
│   ├── Projects/
│   │   ├── ProjectDetailsPage.tsx
│   │   └── ProjectsPage.tsx
│   ├── Quote/
│   │   ├── QuotePage.tsx
│   │   └── QuoteSuccessPage.tsx
│   ├── Services/
│   │   ├── ServiceDetailsPage.tsx
│   │   └── ServicesPage.tsx
│   ├── Sitemap/
│   │   └── SitemapPage.tsx
│   ├── Terms/
│   │   └── TermsAndConditionsPage.tsx
│   └── Testimonials/
│       └── TestimonialsPage.tsx
│
├── providers/                   # Context providers
│   ├── AuthProvider.tsx
│   ├── NotificationProvider.tsx
│   ├── QueryProvider.tsx
│   └── ThemeProvider.tsx
│
├── routes/                      # Route definitions
│   ├── AppRoutes.tsx
│   ├── PublicRoutes.tsx
│   ├── AdminRoutes.tsx
│   ├── ProtectedRoute.tsx
│   ├── PublicRoute.tsx
│   └── RoleBasedRoute.tsx
│
├── seo/                         # SEO utilities
│   ├── MetaTags.tsx
│   ├── OpenGraph.tsx
│   ├── Seo.tsx
│   ├── SitemapGenerator.ts
│   └── StructuredData.tsx
│
├── services/                    # API service layer
│   ├── analyticsApi.ts
│   ├── api.ts
│   ├── authApi.ts
│   ├── contactApi.ts
│   ├── galleryApi.ts
│   ├── notificationsApi.ts
│   ├── projectApi.ts
│   ├── quoteApi.ts
│   ├── reportsApi.ts
│   ├── serviceApi.ts
│   ├── settingsApi.ts
│   ├── testimonialApi.ts
│   └── usersApi.ts
│
├── store/                       # State management
│   ├── authStore.ts
│   ├── dashboardStore.ts
│   ├── analyticsStore.ts
│   ├── serviceStore.ts
│   ├── galleryStore.ts
│   ├── projectStore.ts
│   ├── testimonialStore.ts
│   ├── quoteStore.ts
│   ├── contactStore.ts
│   ├── userStore.ts
│   ├── settingsStore.ts
│   └── notificationStore.ts
│
├── styles/                      # Global styles
│   ├── globals.css
│   └── tailwind.css
│
├── types/                       # TypeScript type definitions
│   ├── analytics.types.ts
│   ├── auth.types.ts
│   ├── common.types.ts
│   ├── company.types.ts
│   ├── contact.types.ts
│   ├── dashboard.types.ts
│   ├── gallery.types.ts
│   ├── notification.types.ts
│   ├── order.types.ts
│   ├── permission.types.ts
│   ├── project.types.ts
│   ├── quote.types.ts
│   ├── report.types.ts
│   ├── role.types.ts
│   ├── service.types.ts
│   ├── settings.types.ts
│   ├── testimonial.types.ts
│   └── user.types.ts
│
├── utils/                       # Utility functions
│   ├── downloadFile.ts
│   ├── formatCurrency.ts
│   ├── formatDate.ts
│   ├── helpers.ts
│   ├── permissions.ts
│   ├── seo.ts
│   ├── slugify.ts
│   ├── storage.ts
│   └── validators.ts
│
├── App.css                      # App component styles
├── App.tsx                      # Root component
├── index.css                    # Global styles
└── main.tsx                     # Entry point
```

## Directory Descriptions

| Directory               | Purpose                                                                 |
|-------------------------|-------------------------------------------------------------------------|
| `assets/`               | Static images and assets used in components                            |
| `components/`           | Reusable React components organized by feature/section                 |
| `config/`               | Application configuration (API endpoints, app settings, env vars)      |
| `constants/`            | Constant values (routes, statuses, company info, etc.)                 |
| `context/`              | React Context definitions for state management                         |
| `data/`                 | Static data files used for the application                             |
| `hooks/`                | Custom React hooks                                                     |
| `layouts/`              | Layout wrapper components                                              |
| `pages/`                | Page-level components (each route maps to a page here)                 |
| `providers/`            | Context provider components                                            |
| `routes/`               | Route configuration and routing logic                                  |
| `seo/`                  | SEO-related components and utilities                                   |
| `services/`             | API service layer and data fetching functions                          |
| `store/`                | State management (currently empty, likely for Redux/Zustand)           |
| `styles/`               | Global CSS files                                                       |
| `types/`                | TypeScript type definitions for the entire application                 |
| `utils/`                | Utility/helper functions                                               |

## Notes

- There are duplicate directories: `components/pages/` and `components/layouts/` mirror the top-level `pages/` and `layouts/` directories.
- The application includes both a public-facing website and an admin panel.
