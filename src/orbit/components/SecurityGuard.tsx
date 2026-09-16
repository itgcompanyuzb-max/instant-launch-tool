import { useState, useEffect } from 'react';
import { ShieldAlert, Lock, AlertTriangle } from 'lucide-react';

interface SecurityGuardProps {
  onNotify: (msg: string) => void;
  userId?: string;
  userName?: string;
}

export default function SecurityGuard({
  onNotify,
  userId = '20481',
  userName = 'SARDOR R.'
}: SecurityGuardProps) {
  const [isScreenCaptured, setIsScreenCaptured] = useState(false);
  const [blurOverlay, setBlurOverlay] = useState(false);
  const [securityEventReason, setSecurityEventReason] = useState<string>('');

  useEffect(() => {
    // Security guard operates in passive monitoring mode during dev preview
  }, []);

  return null;
}
