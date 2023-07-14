s3_bucket_uri="s3://cn--now.crenexi.com"
s3_assets_uri="${s3_bucket_uri}/assets"
target_env=$1

# Determine assets source and destination
case $target_env in
  "prod") # From stage to prod
    s3_src="${s3_assets_uri}/stage"
    s3_dest="${s3_assets_uri}/prod"

    ;;
  "stage") # From test to stage
    s3_src="${s3_assets_uri}/test"
    s3_dest="${s3_assets_uri}/stage"
    ;;
  *)
    echo "Error: target environment not specified. Must be 'prod' or 'stage'"
    exit 1
    ;;
esac

# Perform recursive copy
echo "Copying assets from \"$s3_src\" to \"$s3_dest\""
aws s3 cp "$s3_src" "$s3_dest" --recursive
