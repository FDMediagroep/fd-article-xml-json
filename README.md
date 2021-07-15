[![Node.js CI](https://github.com/FDMediagroep/fd-article-xml-json/actions/workflows/node.js.yml/badge.svg)](https://github.com/FDMediagroep/fd-article-xml-json/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/FDMediagroep/fd-article-xml-json/badge.svg?branch=main)](https://coveralls.io/github/FDMediagroep/fd-article-xml-json?branch=main)
[![Node.js Package](https://github.com/FDMediagroep/fd-article-xml-json/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/FDMediagroep/fd-article-xml-json/actions/workflows/npm-publish.yml)
[![Bundle-size minified+gzip](https://img.shields.io/bundlephobia/minzip/@fdmg/article-xml-json)](https://bundlephobia.com/result?p=@fdmg/article-xml-json)
[![NPM](https://img.shields.io/npm/v/@fdmg/article-xml-json?color=blue)](https://npmjs.com/package/@fdmg%2Farticle-xml-json)

# fdmg-xml-json

This repository is a simple xml to json parser for fdmg-article-content.

## Prerequisites

-   NodeJS
-   NPM

## Installation

Install the `fdmg-xml-json` as dependency for your project:

-   NPMJS: `npm i @fdmg/article-xml-json`

## Getting Started

To run the repository locally:
-   Run `npm i` to install required dependencies
-   Run `npm run build` to build the project

To use `@fdmg/article-xml-json` in your project:
-   Install as a dependency
```
import XMLToJSON from "@fdmg/article-xml-json";

function Foo() {
    return (
        XMLToJSON.parseXMLToJSON(<<your fdmg-article-content-xml file here>>);
    )
}
```

