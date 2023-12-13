import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect } from 'react';
import { fDate } from '../../utils/formatTime';
import CommentReaction from './CommentReaction';
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { deleteComment, getComments } from './commentSlice';

function CommentCard({ comment }) {
  const { user } = useAuth();
  const currentUserId = user._id;
  const commentUserId = comment?.author?._id;
  const commentId = comment._id;
  const postId = comment.post;

  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    const result = window.confirm('Want to delete this comment?');
    if (result) {
      dispatch(deleteComment({ commentId, postId }));
    }
  };

  return (
    <Stack direction="row" spacing={2} sx={{ position: 'relative' }}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
        <Stack
          direction="row"
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>

          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
      {currentUserId === commentUserId ? (
        <IconButton
          onClick={handleDeleteComment}
          sx={{
            zIndex: 9,
            m: 0,
            p: 0,
            position: 'absolute',
            top: -10,
            right: -10,

            backgroundColor: 'grey.400',
            color: '#fff',

            '&:hover': {
              color: 'grey.500',
            },
          }}
        >
          <ClearIcon />
        </IconButton>
      ) : (
        <></>
      )}
    </Stack>
  );
}

export default CommentCard;
