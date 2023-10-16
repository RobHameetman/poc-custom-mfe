# Micro-Frontend Orchestration with WebComponents

The modern web landscape is evolving at a rapid pace, and with it comes the need
for scalable and modular solutions. This project from 2020 presents a Proof of
Concept for a custom micro-frontend orchestration layer implemented using
WebComponents. It showcases a blend of technical creativity, forward-thinking,
and an unrelenting passion for pushing the boundaries of what's possible on the
Front End. Some key features of the project are:

- **Dynamic Routing**: Seamlessly navigate between micro-frontends with the
  `<app-router>` and `<app-route>` components.
- **Component Registration**: Leverage an event-driven architecture for
  predictable component registration and lifecycle management.
- **Custom JSX Pipeline**: Write services in TSX with a tailored rendering
  process for a more intuitive development experience.
- **Build Process Abstraction**: Ensure consistency across services with a
  centralized shared build pipeline.
- **Service Lifecycle Management**: Efficiently handle each phase of a service's
  lifecycle, from boot to unload.
- **Service Endpoint Discovery**: Dynamically identify and manage service
  endpoints.

> Please note that this project is an endeavor of curiosity. If you're looking
> for the best way to go about building a micro-frontend, you should use Module
> Federation.

## Architecture Overview

<!--
Diagrams to Include:
- System Flowchart: A top-level visual representation of the system flow, from
  route activation to service mounting and unmounting.
- Event Flow Diagram: A detailed representation showcasing the event-driven
  architecture, highlighting event sources, handlers, and their interplay.
- Package Interaction Diagram: A visual layout of how the different NPM packages
  interact with each other.
-->

### Package Ecosystem

- `@microfrontend-example/core`: An advanced event-driven orchestration layer
  used in the shell.

- `@microfrontend-example/create-component`: An initializer package that
  provides scaffolding for new UI components.

- `@microfrontend-example/create-package`: An initializer package that provides
  scaffolding for new packages in the `@microfrontend-example/` scope.

- `@microfrontend-example/create-service`: An initializer package that provides
  scaffolding for new microfrontend services.

- `@microfrontend-example/jsx`: A lightweight VDOM that allows UI components to
  be implemented in JSX.

- `@microfrontend-example/scripts`: A powerful shared build pipeline for
  centralized build configs and processes.

### Orchestration Phases

In the `@microfrontend-example/core` package, orchestration occurs during phases
for **registration**, **orchestration**, **routing**, and **service management**.

### Service Lifecycle

Each service goes through a lifecycle which repeats as the user navigates the
application. These lifecycle phases are **boot**, **load**, **mount**,
**unmount**, and **unload**. A service is booted, loaded, and mounted when the
user navigates to the route for that service, and is unmounted and unloaded when
the user navigates to the route for another service.

## Definitions

- *registry*: Manages an aggregation of `Service`s.

- *orchestrator*: Determines whether or not the orchestration process should run.

- *router*: Handles navigation and both static and dynamic routing.

- *service*: Represents each micro-frontend service in the system. Handles
  loading, mounting, and unmounting of services.

- *shell*: The shell serves `index.html` to the client and provides the entire
  orchestration layer responsible for registering, loading, mounting,
  unmounting, and unloading micro-frontend services.

## Events

| **Event**                 |     |
| ------------------------- | --: |
| `<service>:CHANGE_STATUS` |     |
| `<service>:REGISTER`      |     |
| `<service>:LOAD`          |     |
| `<service>:MOUNT`         |     |
| `<service>:STOP`          |     |
| `<service>:UNMOUNT`       |     |
| `<service>:UNLOAD`        |     |
| `<service>:BEFORE_CHANGE` |     |
| `<service>:NO_APP_CHANGE` |     |
| `<service>:ROUTING_EVENT` |     |
