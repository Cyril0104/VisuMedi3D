#!/bin/bash

#####################
nrrd_file="public/temp/out.nrrd"
#####################

# Remove old raw files
rm public/temp/tempraw/*.raw


# convert dcm files in raw
for raw_file in public/temp/CT/*.dcm
do
	dcmdump +W public/temp/tempraw "$raw_file" > /dev/null
done

# write header
cat > "$nrrd_file" <<EOF
NRRD0004
# my first nrrd
type: short
dimension: 3
space: left-posterior-superior
sizes: 512 512 $1
space directions: (1,0,0) (0,1,0) (0,0,1)
endian: little
encoding: gzip
space origin: (0,0,0)

EOF

# search for raw files
tmp_file="public/temp/tempraw/tmp.raw"
touch "$tmp_file"
for raw_file in public/temp/tempraw/*.raw
do
	# concat raw file to tmp file
	cat "$raw_file" >> "$tmp_file"	
done

# GZip tmp file and concat to nrrd file
cat "$tmp_file" | gzip >> "$nrrd_file"

#END
echo "Done"

