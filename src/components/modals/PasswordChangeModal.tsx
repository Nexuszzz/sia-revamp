import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Password saat ini wajib diisi'),
  newPassword: z
    .string()
    .min(12, 'Password minimal 12 karakter')
    .regex(/[A-Z]/, 'Harus mengandung huruf besar')
    .regex(/[a-z]/, 'Harus mengandung huruf kecil')
    .regex(/[0-9]/, 'Harus mengandung angka')
    .regex(/[^A-Za-z0-9]/, 'Harus mengandung simbol'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Konfirmasi password tidak sesuai',
  path: ['confirmPassword'],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface PasswordChangeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PasswordChangeModal = ({ open, onOpenChange }: PasswordChangeModalProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const newPassword = form.watch('newPassword');

  // Password validation checklist
  const validationChecks = [
    { label: 'Minimal 12 karakter', isValid: newPassword.length >= 12 },
    { label: 'Mengandung huruf besar', isValid: /[A-Z]/.test(newPassword) },
    { label: 'Mengandung huruf kecil', isValid: /[a-z]/.test(newPassword) },
    { label: 'Mengandung angka', isValid: /[0-9]/.test(newPassword) },
    { label: 'Mengandung simbol', isValid: /[^A-Za-z0-9]/.test(newPassword) },
  ];

  const onSubmit = async (values: PasswordFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Password berhasil diubah',
        description: 'Password Anda telah berhasil diperbarui.',
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Gagal mengubah password',
        description: 'Terjadi kesalahan. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ganti Password</DialogTitle>
          <DialogDescription>
            Masukkan password saat ini dan password baru yang memenuhi kriteria keamanan.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Current Password */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Saat Ini</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="Masukkan password saat ini"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Baru</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Masukkan password baru"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Validation Checklist */}
            {newPassword && (
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-medium mb-2">Kriteria Password:</p>
                <div className="space-y-1">
                  {validationChecks.map((check, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {check.isValid ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <X className="h-4 w-4 text-destructive" />
                      )}
                      <span className={check.isValid ? 'text-success' : 'text-muted-foreground'}>
                        {check.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password Baru</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Konfirmasi password baru"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Menyimpan...' : 'Simpan Password'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};