import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';

export default function Login({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});

  /* =========================
     CHECK LOGIN
  ========================= */

  useEffect(() => {
    checkLogin();
  }, []);

  async function checkLogin() {
    try {
      const user = await AsyncStorage.getItem('user');

      if (user) {
        navigation.replace('MainTab');
      }
    } catch (error) {
      console.log(error);
    }
  }

  /* =========================
     VALIDATE
  ========================= */

  function validate() {
    const newErrors = {};

    const trimmedEmail = email.trim();

    const trimmedPassword = password.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    /* EMAIL */

    if (!trimmedEmail) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!emailRegex.test(trimmedEmail)) {
      newErrors.email = 'Email không đúng định dạng';
    }

    /* PASSWORD */

    if (!trimmedPassword) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (!passwordRegex.test(trimmedPassword)) {
      newErrors.password = 'Ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số';
    }

    /* CONFIRM PASSWORD */

    if (!isLogin) {
      if (!confirmPassword.trim()) {
        newErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
      } else if (trimmedPassword !== confirmPassword.trim()) {
        newErrors.confirmPassword = 'Mật khẩu nhập lại không khớp';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  /* =========================
     REGISTER
  ========================= */

  async function handleRegister() {
    if (!validate()) {
      return;
    }

    try {
      const account = {
        email: email.trim(),

        password: password.trim(),
      };

      await AsyncStorage.setItem('account', JSON.stringify(account));

      Alert.alert('Thành công', 'Đăng ký thành công');

      setIsLogin(true);

      setEmail('');

      setPassword('');

      setConfirmPassword('');

      setErrors({});
    } catch (error) {
      console.log(error);
    }
  }

  /* =========================
     LOGIN
  ========================= */

  async function handleLogin() {
    if (!validate()) {
      return;
    }

    try {
      const data = await AsyncStorage.getItem('account');

      if (!data) {
        return Alert.alert('Lỗi', 'Chưa có tài khoản');
      }

      const account = JSON.parse(data);

      if (
        email.trim() === account.email &&
        password.trim() === account.password
      ) {
        await AsyncStorage.setItem('user', JSON.stringify(account));

        navigation.replace('MainTab');
      } else {
        Alert.alert('Lỗi', 'Sai email hoặc mật khẩu');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      {/* LOGO */}

      <View style={styles.logo}>
        <Text style={{ fontSize: 30 }}>🌿</Text>
      </View>

      <Text style={styles.title}>Chào mừng trở lại</Text>

      <Text style={styles.subtitle}>
        {isLogin ? 'Đăng nhập để tiếp tục' : 'Tạo tài khoản mới'}
      </Text>

      {/* TAB */}

      <View style={styles.tab}>
        <TouchableOpacity
          style={[styles.tabBtn, isLogin && styles.active]}
          onPress={() => setIsLogin(true)}
        >
          <Text style={isLogin ? styles.activeText : styles.text}>
            Đăng nhập
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, !isLogin && styles.active]}
          onPress={() => setIsLogin(false)}
        >
          <Text style={!isLogin ? styles.activeText : styles.text}>
            Đăng ký
          </Text>
        </TouchableOpacity>
      </View>

      {/* EMAIL */}

      <TextInput
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        value={email}
        style={[styles.input, errors.email && styles.inputError]}
        onChangeText={(text) => {
          setEmail(text);

          if (errors.email) {
            validate();
          }
        }}
      />

      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* PASSWORD */}

      <View style={[styles.passwordWrap, errors.password && styles.inputError]}>
        <TextInput
          placeholder='Mật khẩu'
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
          value={password}
          onChangeText={(text) => {
            setPassword(text);

            if (errors.password) {
              validate();
            }
          }}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <AntDesign
            name={showPassword ? 'eye' : 'eye-invisible'}
            size={20}
            color='#777'
          />
        </TouchableOpacity>
      </View>

      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {/* CONFIRM PASSWORD */}

      {!isLogin && (
        <>
          <View
            style={[
              styles.passwordWrap,

              errors.confirmPassword && styles.inputError,
            ]}
          >
            <TextInput
              placeholder='Nhập lại mật khẩu'
              secureTextEntry={!showConfirmPassword}
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);

                if (errors.confirmPassword) {
                  validate();
                }
              }}
            />

            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <AntDesign
                name={showConfirmPassword ? 'eye' : 'eye-invisible'}
                size={20}
                color='#777'
              />
            </TouchableOpacity>
          </View>

          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </>
      )}

      {/* BUTTON */}

      <TouchableOpacity
        style={styles.button}
        onPress={isLogin ? handleLogin : handleRegister}
      >
        <Text style={styles.buttonText}>
          {isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </Text>
      </TouchableOpacity>

      {/* OR */}

      <Text style={styles.or}>Hoặc đăng nhập với</Text>

      {/* SOCIAL */}

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn}>
          <AntDesign name='google' size={20} color='#DB4437' />

          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialBtn}>
          <FontAwesome name='apple' size={22} color='black' />

          <Text style={styles.socialText}>Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 20,
  },

  tab: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 20,
  },

  tabBtn: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },

  active: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  activeText: {
    fontWeight: 'bold',
  },

  text: {
    color: '#777',
  },

  input: {
    borderWidth: 1,
    borderColor: '#eee',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },

  passwordWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    backgroundColor: '#fafafa',
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 14,
  },

  inputError: {
    borderColor: '#E53935',
  },

  errorText: {
    color: '#E53935',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },

  button: {
    backgroundColor: '#1B5E20',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  or: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#777',
  },

  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },

  socialText: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
