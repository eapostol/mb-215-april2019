#!/usr/bin/env bash
set -xeuo pipefail

cd android

./gradlew clean
./gradlew assembleRelease
