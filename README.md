# 📊 Todo

This project demonstrates the todo app deployment on AWS with CI-CD using Github Actions. The app is divided into two sections.

- Frontend
- Backend

---

## 🖼️ Architecture Diagrams

### Frontend Architecture

![Frontend Architecture](/diagrams/frontend_deployment.png)

### Frontend CI-CD

![Frontend Architecture](/diagrams/frontend-ci-cd.png)

### Backend Architecture

![Backend Architecture](/diagrams/backend_deployment.png)

### Backend CI-CD

![Backend Architecture](/diagrams/backend-ci-cd.png)

---

# 🌐 Frontend

This frontend application is deployed on AWS and follows a CI/CD pipeline using GitHub and AWS services.

## 🔧 Components

- **User**: Accesses the frontend via a browser.
- **CloudFront**: Serves static assets with low latency.
- **S3**: Stores frontend assets (HTML, CSS, JS).
- **Certificate Manager**: Manages SSL certificates for HTTPS.
- **Github Actions**: Builds and deploys the frontend via GitHub webhooks.
- **GitHub**: Triggers builds via webhooks on push events.

## 🌐 Domain

- Uses a custom domain linked via AWS Certificate Manager.

## 🔄 CI/CD Flow

1. Developer pushes code to GitHub.
2. Webhook triggers Github Actions.
3. Github Actions installs dependencies, run unit tests and build assets.
4. Old assets of S3 are replaced with new assets.
5. After cache invalidation, CloudFront serves updated content.

---

# ⚙️ Backend

This backend service is deployed using AWS ECS Fargate and utilizes a CI/CD pipeline integrated with GitHub.

## 🔧 Components

- **Developer**: Pushes code to GitHub.
- **GitHub**: Triggers build via webhook.
- **Github Actions**: Builds Docker image and pushes to ECR.
- **ECR**: Stores container images.
- **ECS + Fargate**: Runs backend containers serverlessly.
- **ALB (Application Load Balancer)**: Routes traffic to ECS services.
- **Certificate Manager**: Provides HTTPS support.

## 🌐 Domain

- Custom domain integrated through Certificate Manager and ALB.

## 🔄 CI/CD Flow

1. Developer commits code to GitHub.
2. Webhook triggers Github Actions.
3. Github Actions builds Docker image and pushes to ECR.
4. ECS (via Fargate) pulls latest image from ECR.
5. ALB routes incoming HTTPS requests to updated ECS service.

---
