# TripFare BD

## Project Overview

TripFare BD is a comprehensive travel fare monitoring and comparison web platform designed for commuters and travelers across Bangladesh. The application solves the problem of scattered and fluctuating travel costs by aggregating fare information across buses, trains, launches, flights, and ride-sharing services into a single, accessible dashboard. Commuters and travelers can effortlessly track daily fare trends, compare different transport operators, and identify the most affordable travel options before embarking on their journeys.

## Technologies Used

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Programming Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **UI Components:** HeroUI (v3)
- **Icons:** Lucide React, React Icons (Heroicons), Unicode Transport Emojis
- **Authentication:** Better Auth (Email & Password, Google OAuth)
- **Database:** MongoDB (via official MongoDB Node.js Driver)
- **Animations:** React Fast Marquee
- **Notifications:** React Hot Toast
- **Typography:** Hind Siliguri (Google Fonts), Geist Sans & Mono

## Features

- **Dynamic Category Navigation:** Top navigation bar displaying all primary transport modes (Bus, Train, Launch, Flight, and Ride-Sharing) with localized Bengali labels and icons.
- **Daily Fare Increase Tracker:** Curated section highlighting the top 6 routes experiencing price hikes, sorted from highest percentage increase to lowest with distinct warning badges.
- **Daily Fare Savings Tracker:** Dedicated section showcasing the top 6 routes with price reductions, allowing users to quickly spot economical travel opportunities.
- **Complete Route Directory:** Browseable grid displaying all registered intercity and local travel routes across Bangladesh with real-time route counters.
- **Category Filtering & Sorting:** Category-specific pages allowing users to filter routes by transport type and sort listings by price (lowest to highest, or highest to lowest).
- **Comprehensive Route Details:** In-depth view for every route featuring departure/destination points, route distance in kilometers, estimated travel duration, and last update timestamps.
- **Statistical Fare Insights:** Clear at-a-glance calculation cards displaying the minimum fare, maximum fare, and average fare for each journey.
- **Operator Fare Comparison Table:** Side-by-side comparison table listing all available operators, service classes (e.g., AC, Non-AC, Chair Coach, Shovon, Economy), departure schedules, and ticket prices, clearly flagging the lowest-cost operator.
- **Fare Guidelines & Notes:** Official fare policies, travel advisories, and operator disclaimers for informed decision-making.
- **User Authentication:** Complete authentication workflow supporting both standard Email/Password sign-up/sign-in and seamless one-click Google OAuth login.
- **Route Protection:** Server-side route guarding using Next.js Proxy to ensure secure access to user profile pages and detailed comparison data.
- **User Profile Management:** Dedicated profile dashboard displaying user information, email verification status, and an interactive profile update form with feedback toasts.
- **Responsive Design & Modern UI:** Mobile-first layout with smooth transitions, custom Bengali typography, skeleton loading placeholders, and friendly error states.
