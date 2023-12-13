import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySentRequests } from './friendSlice';
import {
  Box,
  Card,
  Container,
  Stack,
  TablePagination,
  Typography,
} from '@mui/material';
import SearchInput from '../../components/SearchInput';
import UserTable from './UserTable';

function RequestsSent() {
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { currentPageUsers, usersById, totalUsers } = useSelector(
    state => state.friend
  );

  const users = currentPageUsers.map(userId => usersById[userId]);

  const dispatch = useDispatch();

  const handleSubmit = searchQuery => {
    setFilterName(searchQuery);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(
      getMySentRequests({ filterName, page: page + 1, limit: rowsPerPage })
    );
  }, [filterName, page, rowsPerPage, dispatch]);
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Requests Sent
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <SearchInput handleSubmit={handleSubmit} />
          <Typography
            variant="subtitle"
            sx={{ color: 'text.secondary', ml: 1 }}
          >
            {totalUsers > 1
              ? `${totalUsers} users found`
              : totalUsers === 1
              ? `${totalUsers} user found`
              : 'No user found'}
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <TablePagination
              sx={{
                '& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon':
                  {
                    display: { xs: 'none', md: 'block' },
                  },
              }}
              component="div"
              count={totalUsers ? totalUsers : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Stack>
        <UserTable users={users} />
      </Card>
    </Container>
  );
}

export default RequestsSent;