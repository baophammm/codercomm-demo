# CoderComm Demo

## Requirements

### Authentication

- [ ] User have to log in with email and password
- [ ] New User can register for a new account with name, email, password
- [ ] User stay logged in with refreshing page.

### User Profile
- [ ] On the left side of the homepage, User can see his/her profile info including scorecards of number of friends and posts.
- [ ] On the profile cover, User can switch tabs between Profile, Friends, Requests, Add Friend.
- [ ] User can update profile info.

### Posts and Comments

- [ ] User can create a new post with a content and an image. the image is optional. User can see the new post after successfully created.
- [ ] After logged, in, User can see a homepage with his/her posts and his/her friends post. New post should be on the top. User can click load more to see more post. If there is no more post, Load More button should be disabled.
- [ ] User can comment on a post. User can see the comment after successfully created.

### Reaction
- [ ] User can like/dislike a post or a comment

### Add Friends
- [ ] User can see a table of all users in the system
- [ ] User can find users by name
- [ ] User can see the friendship status with all users and take actions:
  - [ ] User can send request to other users
  - [ ] User can cancel a sent request
  - [ ] User can accept/decline a friend request
  - [ ] User can unfriend a target user

### Friend Lists
- [ ] User can see a list of friends. User can find friends by name
- [ ] User can unfriend

### Friend Request Lists
- [ ] User can see a list of friend requests. User can find friend requests by name
- [ ] USer can accept/decline friend requests.

### Target User Profile
- [ ] User can see the profile of other users

## Create Project

```
npx create-react-app codercomm-demo --template redux
```

- Install libraries

```
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material @mui/lab
npm install react-router-dom@6 react-hook-form @hookform/resolvers yup
npm install axios numeral lodash jwt-decode change-case
npm install react-markdown rehype-raw date-fns react-dropzone react-toastify
```