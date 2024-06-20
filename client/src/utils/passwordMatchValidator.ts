import { UseFormWatch } from 'react-hook-form';

export const passwordMatchValidator =
    (watch: UseFormWatch<any>) => (confirmedPassword: string) => {
        return (
            confirmedPassword === watch('password') || 'Passwords should match!'
        );
    };
