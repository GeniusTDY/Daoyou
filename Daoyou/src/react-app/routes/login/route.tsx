import {
  AuthPageShell,
  toErrorMessage,
  useAuthFeedback,
  validateRequiredField,
} from '@app/components/auth';
import { InkButton } from '@app/components/ui/InkButton';
import { InkInput } from '@app/components/ui/InkInput';
import { useAuth, type AuthActionError } from '@app/lib/auth/authContext';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function LoginRoute() {
  const { signInWithPassword } = useAuth();
  const { showErrorDialog } = useAuthFeedback();
  const navigate = useNavigate();

  const [daohao, setDaohao] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    daohao?: string;
    password?: string;
  }>({});

  const handleSubmit = async () => {
    const nextErrors = {
      daohao: validateRequiredField(daohao, '请输入道号'),
      password: validateRequiredField(password, '请输入密码'),
    };
    setErrors(nextErrors);

    if (nextErrors.daohao || nextErrors.password) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await signInWithPassword(daohao, password);

      if (error) {
        throw error;
      }

      navigate('/game', { replace: true });
    } catch (error) {
      showErrorDialog(
        toErrorMessage(error as AuthActionError, '登录失败，请稍后重试'),
        '登录失败',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageShell
      title="【登录】"
      lead="使用道号和密码登录。"
      footer={
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-ink-secondary">还没有账号？</span>
          <InkButton href="/signup" variant="primary">
            去注册
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
          placeholder="请输入密码"
          error={errors.password}
          disabled={loading}
        />
        <InkButton
          type="submit"
          variant="primary"
          pending={loading}
          pendingLabel="登录中……"
          className="w-full text-center"
        >
          立即登录
        </InkButton>
      </form>
    </AuthPageShell>
  );
}