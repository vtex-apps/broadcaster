# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.10.0] - 2022-12-06
### Removed

- Removed accounts starting with "motorola" from not being notified by the broadcaster app.

## [0.9.0] - 2022-07-15

### Added

- App setting `notifySubaccounts` to allow notifications to be duplicated to any related subaccounts

## [0.8.1] - 2022-06-03

### Fixed

- Remove unnecessary policy from `/notify` route

## [0.8.0] - 2022-06-02

### Added

- Enables a `targetWorkspace` to proxy `notify` calls

## [0.7.8] - 2022-03-15

### Updated

- README.md update.

## [0.7.7] - 2021-06-22

### Removed

- filter events without `HasStockKeepingUnitModified` property

## [0.7.6] - 2020-09-24

### Fixed

- Increases memory

## [0.7.5] - 2020-06-05

### Fixed

- Removes broadcaster worker dependency

## [0.7.4] - 2020-04-14

### Fixed

- Adds motorola account blacklist

## [0.7.3] - 2020-04-14

### Changed

- Only forwards events to vtex

## [0.7.2] - 2020-04-03

### Fixed

- Removes accounts whitelist

## [0.7.1] - 2020-03-18

### Fixed

- Adds accounts whitelist

## [0.6.1] - 2020-03-17

### Fixed

- Disable broadcasting of events

## [0.6.0] - 2020-03-06

### Fixed

- Reverts `Allows notifications even without changes`
- Throttling middleware

## [0.5.4] - 2020-02-28

### Fixed

- Allows notifications even without changes

## [0.5.3] - 2020-02-11

### Fixed

- Upgrades to node 6.x
- Uses catalog graphql client from @vtex/api

## [0.5.1] - 2020-02-04

### Fixed

- Adds sales channel data in product query
- Adds settings to disables notification filter

## [0.5.0] - 2019-12-26

## [0.4.7] - 2019-12-04

## [0.4.6] - 2019-12-03

## [0.4.5] - 2019-12-03

## [0.4.4] - 2019-12-03

## [0.4.3] - 2019-11-27

## [0.4.2] - 2019-11-27

## [0.4.1] - 2019-11-21

## [0.4.0] - 2019-11-21

## [0.3.0] - 2019-11-21

## [0.2.1] - 2019-11-11

### Added

- LRU Cache to tenant/segment clients

## [0.2.0] - 2019-11-11

### Added

- Tenant/segment dependency to use the right locale headers for calling vtex.catalog-graphql when necessary

## [0.1.14] - 2019-10-24

## [0.1.13] - 2019-10-23

## [0.1.12] - 2019-10-23

## [0.1.11] - 2019-10-23

## [0.1.10] - 2019-10-22

## [0.1.9] - 2019-10-22

## [0.1.8] - 2019-10-21

## [0.1.7] - 2019-10-18

## [0.1.6] - 2019-10-18

## [0.1.5] - 2019-10-11

## [0.1.4] - 2019-10-11

## [0.1.3] - 2019-10-11

## [0.1.2] - 2019-09-19

## [0.1.1] - 2019-09-16

## [0.1.0] - 2019-09-10

## [0.0.3] - 2019-09-06

## [0.0.2] - 2019-09-05
