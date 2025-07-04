#!/bin/bash
cd /home/kavia/workspace/code-generation/sketchquest-107038-e1c53bfa/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

