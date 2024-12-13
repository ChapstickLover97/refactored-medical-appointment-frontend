
# Medical Appointment System Frontend

This project is the React-based frontend for the Medical Appointment System. It provides a user interface for managing appointments, doctors, and patient-related functionalities. The frontend interacts with the backend API to fetch, display, and update data.

## Features

- Dynamic UI for interacting with backend services.
- Separate routes for `Patient` and `Admin` workflows.
- Integration with a RESTful API for real-time data operations.
- Basic error handling for API failures.
- Responsive design for improved user experience.

## Technologies Used

- React 18
- JavaScript (ES6+)
- React Router for navigation
- Fetch API for backend communication
- CSS for styling

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd medical_appointment_system_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Access the application at `http://localhost:3000`.

## File Structure

- **components/Navbar.js**: Navigation bar shared across the application.
- **pages/admin**: Contains all admin-related components, such as Doctor Management and Appointment List.
- **pages/patient**: Contains patient-related components like Appointment Creation and Dashboard.
- **App.js**: The main application file managing routes and rendering components.
- **AuthenticatedRoutes.js**: Handles route protection logic.

## Strengths

1. **Separation of Concerns**: Code is modular, with distinct directories for admin and patient pages.
2. **Dynamic Rendering**: Components dynamically update based on backend data.
3. **CORS-Ready Integration**: Configured to communicate with the backend seamlessly.
4. **Responsive Design**: The layout is designed to adapt to various screen sizes.

## Weaknesses

1. **Error Handling**: Current error handling is basic and lacks user-friendly error messages.
2. **Code Complexity**: Certain components, such as `MOCKDoctorManagement.js`, can be optimized for readability.
3. **Authentication Dependencies**: Earlier reliance on Okta caused issues during integration; this is being refactored.
4. **State Management**: State logic can be simplified using a state management library like Redux.

## Core Components

### Navbar.js
- Central navigation hub for the app.
- Contains links to both patient and admin workflows.

### Patient Pages
1. **PatientAppointmentList.js**: Displays a list of patient appointments with delete functionality.
2. **PatientAppointmentCreation.js**: Allows patients to create appointments by selecting a doctor and specialization.

### Admin Pages
1. **AdminAppointmentList.js**: Displays all appointments for admin review and management.
2. **DoctorManagement.js**: Provides CRUD operations for managing doctors.

## Key Routes

| Path              | Component                    | Description                                |
|-------------------|------------------------------|--------------------------------------------|
| `/`               | HomePage                     | Landing page                               |
| `/patient`        | PatientDashboard             | Dashboard for patients                     |
| `/admin`          | AdminDashboard               | Dashboard for admins                       |
| `/login`          | LoginPage                    | Handles user login                         |
| `/admin/doctors`  | MOCKDoctorManagement         | Manage doctors (CRUD operations)          |

## Limitations

1. **Mock Pages**: Some features, like Doctor Management, are implemented as mock pages and do not fully integrate with backend workflows.
2. **Testing**: Limited testing coverage; needs additional unit and integration tests.
3. **Styling**: Basic styling is in place, but there is room for improvement in aesthetics and accessibility.

## Future Improvements

- **Enhanced Error Handling**: Add comprehensive user-friendly error messages.
- **State Optimization**: Integrate Redux for more scalable state management.
- **Testing Framework**: Introduce testing with Jest or Cypress.
- **Design Enhancements**: Improve UI/UX with advanced CSS or libraries like Tailwind CSS.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.
