#!bin/bash
rm -rf public dist
cd src
fis3 release prod
fis3 release git