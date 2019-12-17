# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Increase timeout with `catalog-graphql` from 1s to 3s

## [0.2.1] - 2019-11-11
### Added
- LRU Cache to tenant/segment clients

## [0.2.0] - 2019-11-11
### Added
- Tenant/segment dependency to use the right locale headers for calling vtex.catalog-graphql when necessary
