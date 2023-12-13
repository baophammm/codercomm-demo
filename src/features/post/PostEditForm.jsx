import React, { useCallback } from 'react';
import { FormProvider, FTextField, FUploadImage } from '../../components/form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { alpha, Box, Button, Card, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from './postSlice';

const yupSchema = Yup.object().shape({
  content: Yup.string().required('Content is required'),
});

function PostEditForm({ post, setCurrentEditedPost }) {
  const defaultValues = {
    content: post.content,
    image: post?.image || '',
  };

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.post);

  const cancelEdit = () => {
    setCurrentEditedPost(null);
  };

  const onSubmit = data => {
    dispatch(editPost({ postId: post._id, ...data }));
    setCurrentEditedPost(null);
  };

  const handleDrop = useCallback(
    acceptedFiles => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FTextField
          name="content"
          multiline
          fullWidth
          rows={4}
          placeholder="Share what you are thinking here..."
          sx={{
            '& fieldset': {
              borderWidth: '1px !important',
              borderColor: alpha('#919EAB', 0.32),
            },
          }}
        />

        <FUploadImage
          name="image"
          accept="image/*"
          maxSize={3145728}
          onDrop={handleDrop}
        />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-around"
          >
            <LoadingButton
              variant="contained"
              size="small"
              onClick={() => cancelEdit()}
              sx={{ backgroundColor: 'error.main' }}
              loading={isSubmitting || isLoading}
            >
              Cancel Edit
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Edit Post
            </LoadingButton>
          </Stack>
        </Box>
      </Stack>
    </FormProvider>
  );
}

export default PostEditForm;
