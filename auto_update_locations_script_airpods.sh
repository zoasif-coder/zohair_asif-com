#!/bin/bash

# Open Find My app and wait
open "/System/Applications/FindMy.app"
sleep 5

cd /Users/zohairasif/zohair_asif-com/Find-My-Mapper/mapper
# Activate Python virtual environment
source .findmy/bin/activate

# Run the tracker script
.findmy/bin/python device_tracker.py

# Copy CSV to the website folder
cp /Users/zohairasif/zohair_asif-com/Find-My-Mapper/mapper/locations.csv /Users/zohairasif/zohair_asif-com/src/assets/coords/locations.csv

# Deploy site
cd /Users/zohairasif/zohair_asif-com
npm run deploy

# Commit and push
git add .
git commit -m "added new location $(date '+%Y-%m-%d %H:%M:%S')"
git push