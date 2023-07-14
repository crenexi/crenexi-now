#!/bin/bash

REGION="us-east-1"
OWNER=321820567679
DOMAIN=crenexi
REPO=crenexi

# Obtain the authorization token and endpoint
AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain $DOMAIN --domain-owner $OWNER --region $REGION --query authorizationToken --output text)
REGISTRY="$DOMAIN-$OWNER.d.codeartifact.$REGION.amazonaws.com/npm/$REPO/"

# Append the token to .npmrc
echo "registry=https://$REGISTRY" > .npmrc
echo "//$REGISTRY:_authToken=$AUTH_TOKEN" >> .npmrc
