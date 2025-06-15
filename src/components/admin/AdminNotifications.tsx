
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('announcement');
  const [targetUser, setTargetUser] = useState('');
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    // Placeholder: fetch from supabase notification table (if implemented)
    setNotifications([]);
    setLoading(false);
  };

  const sendNotification = async () => {
    // Placeholder: In real use, insert into "notifications" table via supabase
    toast({ title: "Notification Sent", description: `${type} to ${targetUser || 'All'}` });
    setMessage('');
    setTargetUser('');
    // Optionally refresh notification list
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 mb-4">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>{type.charAt(0).toUpperCase() + type.slice(1)}</SelectTrigger>
            <SelectContent>
              <SelectItem value="announcement">Announcement</SelectItem>
              <SelectItem value="direct">Direct (User)</SelectItem>
            </SelectContent>
          </Select>
          {type === "direct" && (
            <Input placeholder="Target User ID" value={targetUser} onChange={e => setTargetUser(e.target.value)} />
          )}
          <Textarea placeholder="Write your notification..." value={message} onChange={e => setMessage(e.target.value)} />
          <Button onClick={sendNotification} disabled={!message.trim()}>Send Notification</Button>
        </div>
        {/* Notification list/history could render here */}
        <div>
          <p className="text-sm text-gray-500">Sent notifications will appear here in future!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminNotifications;
