
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WorkflowTask {
  id: string;
  task_type: string;
  product_id: string | null;
  assigned_admin_id: string | null;
  status: string | null;
  priority: string | null;
  due_date: string | null;
  created_at: string | null;
  completed_at: string | null;
  product?: {
    name: string;
    workflow_status: string;
  } | null;
}

interface WorkflowHistory {
  id: string;
  product_id: string | null;
  status_from: string | null;
  status_to: string;
  admin_id: string | null;
  notes: string | null;
  created_at: string | null;
}

export const useWorkflow = () => {
  const [tasks, setTasks] = useState<WorkflowTask[]>([]);
  const [history, setHistory] = useState<WorkflowHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_workflow_tasks')
        .select(`
          *,
          product:products(name, workflow_status)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching workflow tasks:', error);
      toast({
        title: "Error",
        description: "Failed to fetch workflow tasks",
        variant: "destructive",
      });
    }
  };

  const fetchHistory = async (productId?: string) => {
    try {
      let query = supabase
        .from('product_workflow_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (productId) {
        query = query.eq('product_id', productId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching workflow history:', error);
    }
  };

  const updateProductWorkflowStatus = async (
    productId: string, 
    newStatus: string, 
    notes?: string
  ) => {
    try {
      // Get current product status
      const { data: currentProduct } = await supabase
        .from('products')
        .select('workflow_status')
        .eq('id', productId)
        .single();

      // Update product status
      const { error: updateError } = await supabase
        .from('products')
        .update({ 
          workflow_status: newStatus,
          admin_notes: notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId);

      if (updateError) throw updateError;

      // Add to workflow history
      const { error: historyError } = await supabase
        .from('product_workflow_history')
        .insert({
          product_id: productId,
          status_from: currentProduct?.workflow_status,
          status_to: newStatus,
          notes: notes
        });

      if (historyError) throw historyError;

      toast({
        title: "Success",
        description: `Product status updated to ${newStatus}`,
      });

      fetchTasks();
      fetchHistory();
    } catch (error) {
      console.error('Error updating workflow status:', error);
      toast({
        title: "Error",
        description: "Failed to update workflow status",
        variant: "destructive",
      });
    }
  };

  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      const updateData: any = { status };
      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('admin_workflow_tasks')
        .update(updateData)
        .eq('id', taskId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Task status updated",
      });

      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    }
  };

  const createWorkflowTask = async (
    taskType: string,
    productId: string,
    priority: string = 'medium',
    dueDate?: string
  ) => {
    try {
      const { error } = await supabase
        .from('admin_workflow_tasks')
        .insert({
          task_type: taskType,
          product_id: productId,
          priority,
          due_date: dueDate
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Workflow task created",
      });

      fetchTasks();
    } catch (error) {
      console.error('Error creating workflow task:', error);
      toast({
        title: "Error",
        description: "Failed to create workflow task",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchTasks(), fetchHistory()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    tasks,
    history,
    loading,
    updateProductWorkflowStatus,
    updateTaskStatus,
    createWorkflowTask,
    fetchTasks,
    fetchHistory
  };
};
