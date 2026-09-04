import {
  AuthPageShell,
  toErrorMessage,
  useAuthFeedback,
  validatePasswordConfirmation,
  validateRequiredField,
} from '@app/components/auth';
import { InkButton } from '@app/components/ui/InkButton';
import { InkInput } from '@app/components/ui/InkInput';
import { useAuth, type AuthActionError } from '@app/lib/auth/authContext';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function SignupRoute() {
  const { signUpWithPassword } = useAuth();
  const { showErrorDialog } = useAuthFeedback();
  const navigate = useNavigate();

  const [daohao, setDaohao] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    daohao?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = async () => {
    const nextErrors = {
      daohao: validateRequiredField(daohao, '请输入道号'),
      password: validateRequiredField(password, '请输入密码'),
      confirmPassword: validatePasswordConfirmation(password, confirmPassword),
    };
    setErrors(nextErrors);

    if (nextErrors.daohao || nextErrors.password || nextErrors.confirmPassword) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUpWithPassword(daohao, password);

      if (error) {
        throw error;
      }

      navigate('/game', { replace: true });
    } catch (error) {
      showErrorDialog(
        toErrorMessage(error as AuthActionError, '注册失败，请稍后重试'),
        '注册失败',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageShell
      title="【注册】"
      lead="使用道号和密码创建账号，注册后即可进入游戏。"
      backHref="/login"
      footer={
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-ink-secondary">已有账号？</span>
          <InkButton href="/login" variant="primary">
            去登录
          </InkButton>
        </div>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          void handleSubmit();
        }}
      >
        <InkInput
          label="道号"
          value={daohao}
          onChange={(value) => {
            setDaohao(value);
            setErrors((current) => ({ ...current, daohao: undefined }));
          }}
          placeholder="例：青岚"
          error={errors.daohao}
          disabled={loading}
        />
        <InkInput
          label="密码"
          type="password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            setErrors((current) => ({ ...current, password: undefined }));
          }}
          placeholder="请设置密码"
          error={errors.password}
          disabled={loading}
        />
        <InkInput
          label="确认密码"
          type="password"
          value={confirmPassword}
          onChange={(value) => {
            setConfirmPassword(value);
            setErrors((current) => ({
              ...current,
              confirmPassword: undefined,
            }));
          }}
          placeholder="请再次输入密码"
          error={errors.confirmPassword}
          disabled={loading}
        />
        <InkButton
          type="submit"
          variant="primary"
          pending={loading}
          pendingLabel="注册中……"
          className="w-full text-center"
        >
          立即注册
        </InkButton>
      </form>
    </AuthPageShell>
  );
}