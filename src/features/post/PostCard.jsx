import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { fDate } from '../../utils/formatTime';
import PostReaction from './PostReaction';
import CommentList from '../comment/CommentList';
import CommentForm from '../comment/CommentForm';
import useAuth from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPosts } from './postSlice';
import LoadingScreen from '../../components/LoadingScreen';
import PostEditForm from './PostEditForm';

function PostCard({ post }) {
  const { user } = useAuth();
  const currentUserId = user._id;
  const postUserId = post?.author?._id;

  const { isLoading } = useSelector(state => state.post);
  const dispatch = useDispatch();

  const handleDeletePost = postId => {
    const result = window.confirm('Want to delete this post?');
    if (result) {
      dispatch(deletePost(postId));
    }
  };

  const [currentEditedPostId, setCurrentEditedPost] = useState(null);

  const handleEditPost = postId => {
    setCurrentEditedPost(postId);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderPostMenu = (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleMenuClose} sx={{ mx: 1 }}>
        <Box
          onClick={() => handleDeletePost(post._id)}
          sx={{ width: 1, height: 1, textAlign: 'center' }}
        >
          Delete Post
        </Box>
      </MenuItem>
      <MenuItem onClick={handleMenuClose} sx={{ mx: 1 }}>
        <Box
          onClick={() =>
            handleEditPost(post._id, 'updated text', 'updated image')
          }
          sx={{ width: 1, height: 1, textAlign: 'center' }}
        >
          Edit Post
        </Box>
      </MenuItem>
    </Menu>
  );

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: 'block', color: 'text.primary' }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          currentUserId === postUserId ? (
            <>
              <IconButton onClick={handleProfileMenuOpen}>
                <MoreVertIcon sx={{ fontSize: 30 }} />
              </IconButton>
              {renderPostMenu}
            </>
          ) : (
            <></>
          )
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        {currentEditedPostId === post._id ? (
          <PostEditForm
            post={post}
            setCurrentEditedPost={setCurrentEditedPost}
          />
        ) : (
          <>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                <Typography>{post.content}</Typography>
                {post.image && (
                  <Box
                    sx={{
                      borderRadius: 2,
                      overflow: 'hidden',
                      height: 300,
                      '& img': { objectFit: 'cover', width: 1, height: 1 },
                    }}
                  >
                    <img src={post.image} alt="post"></img>
                  </Box>
                )}
              </>
            )}
          </>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
