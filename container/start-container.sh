#!/bin/bash

# Start api server
yarn server &

# Start client server
yarn client &

echo "Servers started."

# Wait processes to exit
wait

echo "The server has closed."

# Return exit code
# We are not expecting exits, so if this is reached it's probably a crash
exit $?