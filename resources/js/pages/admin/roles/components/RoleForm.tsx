import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Role } from '@/types';
import type { CrudConfig } from '@/types/crud';

type RoleFormProps = {
    config: CrudConfig<Role>;
    errors: Record<string, string>;
    processing: boolean;
    role?: Role;
    permissions: Array<{ id: number; name: string }>;
};

const RoleForm = ({ config, errors, processing, role, permissions }: RoleFormProps) => {
    const fields = config.fields?.filter(
        (field) =>
            field.showFor === 'both' ||
            (field.showFor === 'create' && !role) ||
            (field.showFor === 'edit' && role),
    );

    return (
        <div className="space-y-6">
            {fields?.map((field) => (
                <div key={field.name} className="grid gap-2">
                    <Label htmlFor={field.name}>{field.label}</Label>

                    <Input
                        id={field.name}
                        type={field.type ?? 'text'}
                        className="mt-1 block w-full"
                        defaultValue={
                            role
                                ? role[field.name as keyof typeof role]
                                : ''
                        }
                        name={field.name}
                        autoComplete={field.autoComplete}
                        placeholder={field.placeholder}
                    />

                    <InputError message={errors[field.name]} />
                </div>
            ))}

            <div className="grid gap-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {permissions.map((permission) => {
                        const isSelected = role?.permissions?.some(
                            (p: { id: number }) => p.id === permission.id
                        ) ?? false;

                        return (
                            <label
                                key={permission.id}
                                className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                            >
                                <input
                                    type="checkbox"
                                    name="permissions[]"
                                    value={permission.id}
                                    defaultChecked={isSelected}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <span className="text-sm font-medium">
                                    {permission.name}
                                </span>
                            </label>
                        );
                    })}
                </div>
                <InputError message={errors.permissions} />
            </div>

            <div className="flex items-center gap-4">
                <Button disabled={processing}>
                    {role ? 'Update' : 'Create'}
                </Button>
            </div>
        </div>
    );
};

export default RoleForm;
