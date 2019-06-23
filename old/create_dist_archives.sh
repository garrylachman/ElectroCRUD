#!/bin/bash
cd dist_binaries

## Linux 32bit
cp -Rf ../appDist/ElectoCRUD-linux-ia32 ./
zip -9 --symlinks -r ElectoCRUD-linux-ia32.zip ElectoCRUD-linux-ia32
rm -Rf ElectoCRUD-linux-ia32

## Linux 64bit
cp -Rf ../appDist/ElectoCRUD-linux-x64 ./
zip -9 --symlinks -r ElectoCRUD-linux-x64.zip ElectoCRUD-linux-x64
rm -Rf ElectoCRUD-linux-x64

## Windows 32bit
cp -Rf ../appDist/ElectoCRUD-win32-ia32 ./
zip -9 --symlinks -r ElectoCRUD-win32-ia32.zip ElectoCRUD-win32-ia32
rm -Rf ElectoCRUD-win32-ia32

## Windows 64bit
cp -Rf ../appDist/ElectoCRUD-win32-x64 ./
zip -9 --symlinks -r ElectoCRUD-win32-x64.zip ElectoCRUD-win32-x64
rm -Rf ElectoCRUD-win32-x64

## Mac OSX (darwin)
cp -Rf ../appDist/ElectoCRUD-darwin-x64/ElectoCRUD.app ./ElectoCRUD-darwin-x64.app
zip -9 --symlinks -r ElectoCRUD-darwin-x64.zip ElectoCRUD-darwin-x64.app
rm -Rf ElectoCRUD-darwin-x64.app
