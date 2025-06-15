
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    let query = supabase.from('user_profiles').select('*');
    if (search) {
      query = query.ilike('full_name', `%${search}%`).or(`user_id.ilike.%${search}%`);
    }
    const { data, error } = await query;
    if (error) {
      toast({ title: "User fetch error", description: error.message, variant: "destructive" });
      setUsers([]);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  const banUser = async (userId: string) => {
    const { error } = await supabase
      .from('user_profiles')
      .update({ is_banned: true })
      .eq('user_id', userId);
    if (!error) {
      toast({ title: "User banned" });
      fetchUsers();
    } else {
      toast({ title: "Ban error", description: error.message, variant: "destructive" });
    }
  };

  const unbanUser = async (userId: string) => {
    const { error } = await supabase
      .from('user_profiles')
      .update({ is_banned: false })
      .eq('user_id', userId);
    if (!error) {
      toast({ title: "User unbanned" });
      fetchUsers();
    } else {
      toast({ title: "Unban error", description: error.message, variant: "destructive" });
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <div className="mt-2 flex gap-2">
          <Input placeholder="Search by name or id" value={search} onChange={e => setSearch(e.target.value)} />
          <Button variant="outline" onClick={fetchUsers}>Search</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user =>
              <TableRow key={user.user_id}>
                <TableCell>{user.full_name}</TableCell>
                <TableCell className="text-xs">{user.user_id.slice(0,8)}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.is_banned ? <span className="text-red-600">Banned</span> : <span className="text-green-600">Active</span>}</TableCell>
                <TableCell>
                  {user.is_banned ?
                    <Button size="sm" onClick={() => unbanUser(user.user_id)}>Unban</Button> :
                    <Button size="sm" variant="destructive" onClick={() => banUser(user.user_id)}>Ban</Button>
                  }
                  {/* Profile view, notification etc could go here */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
