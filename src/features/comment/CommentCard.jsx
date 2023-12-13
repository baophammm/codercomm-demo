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
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, getComments } from './commentSlice';
import { COMMENTS_PER_POST } from '../../app/config';

function CommentCard({ comment }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { commentsByPost, currentPageByPost, totalCommentsByPost } =
    useSelector(state => state.comment);

  const currentUserId = user._id;
  const commentUserId = comment?.author?._id;
  const commentId = comment._id;
  const postId = comment.post;

  const handleDeleteComment = () => {
    const result = window.confirm('Want to delete this comment?');
    if (result) {
      const numberOfComments = commentsByPost[postId].length;
      const page =
        numberOfComments <= 1
          ? currentPageByPost[postId] - 1
          : currentPageByPost[postId];
      dispatch(deleteComment({ commentId, postId })).then(() => {
        dispatch(getComments({ postId, page }));
      });
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
