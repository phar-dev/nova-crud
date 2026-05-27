import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { User } from '@/types';
import type { CrudConfig } from '@/types/crud';

type UserFormProps = {
    config: CrudConfig<User>;
    errors: Record<string, string>;
    processing: boolean;
    user?: { name: string; email: string };
};

const UserForm = ({ config, errors, processing, user }: UserFormProps) => {
    const fields = config.fields?.filter(
        (field) =>
            field.showFor === 'both' ||
            (field.showFor === 'create' && !user) ||
            (field.showFor === 'edit' && user),
    );

    return (
        <div className="space-y-6">
            {fields?.map((field) => (
                <div key={field.name} className="grid gap-2">
                    <Label htmlFor={field.name}>{field.label}</Label>

                    {field.type === 'password' ? (
                        <PasswordInput
                            id={field.name}
                            name={field.name}
                            autoComplete={field.autoComplete}
                            placeholder={field.placeholder}
                        />
                    ) : (
                        <Input
                            id={field.name}
                            type={field.type ?? 'text'}
                            className="mt-1 block w-full"
                            defaultValue={
                                user
                                    ? user[field.name as keyof typeof user]
                                    : ''
                            }
                            name={field.name}
                            autoComplete={field.autoComplete}
                            placeholder={field.placeholder}
                        />
                    )}

                    <InputError message={errors[field.name]} />
                </div>
            ))}

            <div className="flex items-center gap-4">
                <Button disabled={processing}>
                    {user ? 'Update' : 'Create'}
                </Button>
            </div>
        </div>
    );
};

export default UserForm;
