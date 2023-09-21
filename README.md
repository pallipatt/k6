# EcoATM K6 Performance Test Automation
This repository contains performance tests for [your project name], which are implemented using [K6](https://k6.io/), a modern load testing tool.

## Prerequisites
Before you can run the performance tests, you'll need to ensure you have the following prerequisites:

- [K6](https://k6.io/) installed on your machine. 
- Install k6
```bash
https://k6.io/docs/get-started/installation/
```
- [Node.js](https://nodejs.org/) (for any custom scripts or result analysis).

### Installation
1. Clone this repository:
   ```shell
   git clone <>
   ```

2. Change to the repository's directory:
   ```shell
   cd k6-performance-tests
   ```

3. Install the required Node.js packages:
   ```shell
   npm init -y
   npm install
   ```

## Running Tests
To run performance tests using K6, you can use the provided test scenarios in the `tests/` directory. You can execute the tests with the following command:

```shell
k6 run specs/test-script.js
```

## License
This project is licensed under the [MIT License](LICENSE.md). You are free to use, modify, and distribute this codebase as per the terms of the license.

