import React, { useState } from 'react';
import {
  TextField, Button, Typography, Container, Box, Grid
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email().required('กรุณากรอกอีเมล'),
  password: yup.string().min(6).required('กรุณากรอกรหัสผ่าน'),
});

const registerSchema = yup.object().shape({
  name: yup.string().required('กรุณากรอกชื่อ'),
  email: yup.string().email().required('กรุณากรอกอีเมล'),
  password: yup.string().min(6).required('กรุณากรอกรหัสผ่าน'),
});

export default function LoginRegisterForm() {
  const [isRegister, setIsRegister] = useState(false);

  interface LoginFormInputs {
    email: string;
    password: string;
  }

  interface RegisterFormInputs extends LoginFormInputs {
    name: string;
  }

  type FormInputs = LoginFormInputs | RegisterFormInputs;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = (data: FormInputs) => {
    console.log(isRegister ? 'สมัครสมาชิก:' : 'เข้าสู่ระบบ:', data);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
          }}
        >
          {/* โลโก้แบบตัวหนังสือ */}
          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: 'bold', mb: 2, color: '#2c3e50' }}
          >
            Fujikura Electronic Components (Thailand) Ltd.
          </Typography>

          <Typography variant="h5" align="center" gutterBottom>
            {isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              {isRegister && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="ชื่อ"
                    {...register('name')}
                    error={isRegister && !!(errors as any).name}
                    helperText={isRegister ? (errors as any).name?.message : ''}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="อีเมล"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="รหัสผ่าน"
                  type="password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Button fullWidth type="submit" variant="contained" color="primary">
                  {isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}
                </Button>
              </Grid>
            </Grid>
          </form>

          <Box textAlign="center" mt={2}>
            <Button onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ' : 'ยังไม่มีบัญชี? สมัครสมาชิก'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}