#!/bin/bash

# Array of menu items
menu_items=(
  '{title: "Notifications", link: "/notifications", Icon: BellIcon}',
  '{title: "Messages", link: "/messages", Icon: EnvelopeIcon}',
  '{title: "Lists", link: "/lists", Icon: ListBulletIcon}',
  '{title: "Bookmarks", link: "/bookmarks", Icon: BookmarkIcon}',
  '{title: "Profile", link: "/profile", Icon: UserIcon}'
)

# Loop through each menu item
for item in "${menu_items[@]}"; do
  # Extract title and link from each item
  title=$(echo "$item" | grep -oP '(?<=title: \").*?(?=\")')
  link=$(echo "$item" | grep -oP '(?<=link: \"/).*?(?=\")')

  # Convert title to lowercase and replace spaces with underscores
  dir_name=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '_')

  # Create directory
  mkdir -p "src/app/$dir_name"

  # Create page.tsx inside the directory
  cat > "src/app/$dir_name/page.tsx" <<EOF
import React from 'react';

export default function ${title}() {
  return (
    <div className='border border-green-500 lg:w-[490px] '>
      <h1> Hello from ${title}</h1>
    </div>
  );
};

EOF

  echo "Created directory and page.tsx for $title at src/app/$dir_name"
done
