![Omniframe][header]

[![npm][npm-badge]][npm-badge-url]
[![Build & Test](https://github.com/omniframe/omniframe/workflows/Build%20&%20Test/badge.svg)](https://github.com/omniframe/omniframe/actions)
[![Release](https://github.com/omniframe/omniframe/workflows/Release/badge.svg)](https://github.com/omniframe/omniframe/actions)
[![license][npm-license]][npm-license-url]

# 📦 @omniframe/starter

A robust project starter template for quick and easy setup

___

- [📦 @omniframe/starter](#-omniframestarter)
  - [💼 [§1.0] Getting Started](#-10-getting-started)
  - [🛠 [§2.0] Building Services](#-20-building-services)
    - [[§2.1] Creating Components](#21-creating-components)
  - [📄 [§3.0] License](#-30-license)

___

```bash
npm init omniframe
```

Omniframe is a new approach to Front End microservice orchestration which
combines asynchronous rendering with organic event-driven service management.

## 💼 [§1.0] Getting Started

Create a new project using the Omniframe interactive CLI:

```bash
npm init omniframe
```

Spin up the app in `development`:

```bash
npm run dev
```

Or in `production`:

```bash
npm start
```

## 🛠 [§2.0] Building Services

To get started building services, run the following command:

```bash
npm init @omniframe/service <service>
```

### [§2.1] Creating Components

Once your new service is up and running, you may begin adding new components by
running the following command in the service's root directory:

```bash
npm run make component ./components/Example
```

## 📄 [§3.0] License

This project is licensed under the MIT License.
See the [LICENSE.md](LICENSE.md) file for details

[header]: /.github/readme.png "Omniframe"
[npm-badge]: https://img.shields.io/npm/v/@omniframe/core.svg
[npm-badge-url]: https://www.npmjs.com/package/@omniframe/core
[npm-license]: https://img.shields.io/npm/l/@omniframe/core.svg
[npm-license-url]: https://github.com/omniframe/omniframe/blob/master/LICENSE