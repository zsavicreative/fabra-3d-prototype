# Fabra 3D Product Customiser

A prototype 3D product customisation tool that allows users to interactively select and customise modular parts of 3D clothing models.

## Features

-   **3D Framework**: Built with Next.js 15, React Three Fiber, and Three.js.
-   **Realistic 3D Scene**: Ambient, directional, and spotlight lighting to enhance model realism.
-   **Modularity Selection**: Users can select parts of the model (e.g., sleeves, collar); the camera focuses dynamically on selected areas.
-   **Persistence**: Multiple part selections are maintained throughout customisation.
-   **Customisation**: Change colors and materials of selected parts using digital fabric textures.
-   **Smooth Transitions**: Implemented with React Suspense and physics-based animations for seamless user experience.
-   **Physics-Enhanced Camera**: Smooth interactions and transitions between modular parts.
-   **Web Server**: Simple backend using Next.js API routes.
-   **Dockerised**: Application runs in a containerized environment for consistency.
-   **Deployment**: Managed with Docker Compose and accessible via a live URL.

## Technologies Used

-   **Frontend**: Next.js 15, React, React Three Fiber, Three.js
-   **Containerisation**: Docker, Docker Compose
-   **Languages**: TypeScript/JavaScript

## Prerequisites

-   **Docker** and **Docker Compose** installed on your machine.

## Local Installation & Running

1.  **Clone the Repository**:

    `git clone https://github.com/zsavicreative/fabra-3d-prototype.git`
    `cd fabra-3d-customizer` 
    
3.  **Build and Run with Docker Compose**:
	   -  `docker-compose up --build`

## Accessing the Application

-   Access the application at **[http://localhost:3000](http://localhost:3000)**.

## Live Demo

-   **URL**: [https://fabra-poc-image-1063239135135.australia-southeast1.run.app/](https://fabra-poc-image-1063239135135.australia-southeast1.run.app/)

## Contact

-   **Author**: Zan Savic
-   **Email**: zsavicreative@gmail.com

----------

**Note**: For detailed architecture and design information, please refer to the accompanying PDF document.