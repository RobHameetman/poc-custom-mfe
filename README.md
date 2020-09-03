# @microfrontend-example

## Getting Started

### Prerequisites

- Node v8.10.0+
- NPM v6.4.1+

## Entities

### Registry

Manages an aggregation of `Service`s.

### Orchestrator

Determines whether or not the orchestration process should run.

### Router

Handles navigation and routing.

### Service

Represents each service in the system. Handles loading, mounting, and unmounting
of services.

## Statuses

| **Status**        |     |
| ----------------- | --: |
| `REGISTERED`      |     |
| `LOADED`          |     |
| `LOAD_ERROR`      |     |
| `BOOTSTRAPPED`    |     |
| `BOOTSTRAP_ERROR` |     |
| `MOUNTED`         |     |
| `MOUNT_ERROR`     |     |
| `RUNNING`         |     |
| `STOPPED`         |     |
| `UNMOUNTED`       |     |
| `UNMOUNT_ERROR`   |     |
| `SKIPPED`         |     |

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

## Process

Fire Event => Update Status => Call Hooks

start() => reroute()

### Registration

The shell calls `registerApplication()` and passes in a name, a load hook, a route
activation function, and an optional set of custom props for each service.

`registerApplication()` fires an `APP_REGISTER` event. Since the s

### Orchestration

## Structure

## Apps

<!--
  Note: I could call `services` "apps" and probably would if I weren't building
  something basically like Microsoft's office.com, a distributed solution for
  enterprise-level suites of apps, so "apps" has an additional user context in
  this case.
 -->

Domain-focused solutions for performing complex integrated business logic.

- `admin`: A portal for managing users, groups, and roles
- `billing`: A portal for managing users, groups, and roles
- `portal`: The primary 'hub' for accessing apps

### Packages

Cross-domain integrations and shared functionality go here.

- `core`: An advanced event-driven orchestration layer
- `scripts`: A powerful shared build pipeline for centralized automation and other cool shib

### Services

Smaller services with more fragmented logic and little-to-no UI should go
here.

- `auth`: A portal for managing users, groups, and roles
- `data`: A GraphQL Apollo server for data aggregation logic

### Shell/Frame

The shell is the orchestration layer served as `index.html` responsible for
registering, loading, mounting, unmounting, and unloading services.
