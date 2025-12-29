import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { FileText, DollarSign, CheckCircle, Users, Plus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// TODO: Replace with real data from API
const mockStats = {
totalInvoices: 24,
outstandingBalance: '$2,847.00',
paidThisMonth: '$8,294.00',
activeClients: 12,
};

const mockRecentInvoices = [
{
id: 'INV-1047',
client: 'Smith & Associates',
amount: '$599.00',
status: 'due' as const,
issuedDate: 'Dec 18, 2024',
},
{
id: 'INV-1046',
client: 'Green Valley Landscaping',
amount: '$349.00',
status: 'paid' as const,
issuedDate: 'Dec 15, 2024',
},
{
id: 'INV-1045',
client: 'Tech Solutions Inc.',
amount: '$899.00',
status: 'due' as const,
issuedDate: 'Dec 12, 2024',
},
{
id: 'INV-1044',
client: "Bella's Bakery",
amount: '$199.00',
status: 'paid' as const,
issuedDate: 'Dec 10, 2024',
},
{
id: 'INV-1043',
client: 'Downtown Dental',
amount: '$499.00',
status: 'overdue' as const,
issuedDate: 'Nov 28, 2024',
},
];

const AdminHome = () => {
return (
<DashboardLayout>
{/_ Header _/}

<div className="mb-8">
<h1 className="text-3xl font-bold text-foreground mb-2">
Admin Dashboard
</h1>
<p className="text-muted-foreground">
EDC Web Design — Internal Admin
</p>
</div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Invoices"
          value={mockStats.totalInvoices}
          icon={FileText}
        />
        <StatCard
          title="Outstanding Balance"
          value={mockStats.outstandingBalance}
          icon={DollarSign}
        />
        <StatCard
          title="Paid This Month"
          value={mockStats.paidThisMonth}
          icon={CheckCircle}
        />
        <StatCard
          title="Active Clients"
          value={mockStats.activeClients}
          icon={Users}
        />
      </div>

      {/* Action Button */}
      <div className="mb-8">
        <Link to="/admin/invoices/create">
          <Button variant="gold" className="gap-2">
            <Plus className="w-4 h-4" />
            Create Invoice
          </Button>
        </Link>
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Recent Invoices
          </h2>
          <Link to="/admin/invoices">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                  Invoice #
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                  Client
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                  Amount
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground hidden md:table-cell">
                  Issued Date
                </th>
              </tr>
            </thead>
            <tbody>
              {mockRecentInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-t border-border hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-foreground font-medium">
                      {invoice.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {invoice.client}
                  </td>
                  <td className="px-6 py-4 text-foreground font-medium">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge variant={invoice.status}>
                      {invoice.status === 'due'
                        ? 'Due'
                        : invoice.status === 'paid'
                        ? 'Paid'
                        : 'Overdue'}
                    </StatusBadge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
                    {invoice.issuedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>

);
};

export default AdminHome;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from '@/components/ui/select';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock clients for selector
const mockClients = [
{ id: '1', name: 'Smith & Associates' },
{ id: '2', name: 'Green Valley Landscaping' },
{ id: '3', name: 'Tech Solutions Inc.' },
{ id: '4', name: "Bella's Bakery" },
{ id: '5', name: 'Downtown Dental' },
{ id: '6', name: 'Harbor View Restaurant' },
];

interface LineItem {
id: string;
description: string;
quantity: number;
rate: number;
}

const AdminInvoiceCreate = () => {
const navigate = useNavigate();
const [client, setClient] = useState('');
const [projectName, setProjectName] = useState('');
const [invoiceNumber, setInvoiceNumber] = useState('INV-1048');
const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
const [dueDate, setDueDate] = useState('');
const [status, setStatus] = useState('due');
const [taxRate, setTaxRate] = useState(0);
const [lineItems, setLineItems] = useState<LineItem[]>([
{ id: '1', description: '', quantity: 1, rate: 0 },
]);

const addLineItem = () => {
setLineItems([
...lineItems,
{ id: Date.now().toString(), description: '', quantity: 1, rate: 0 },
]);
};

const removeLineItem = (id: string) => {
if (lineItems.length > 1) {
setLineItems(lineItems.filter((item) => item.id !== id));
}
};

const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
setLineItems(
lineItems.map((item) =>
item.id === id ? { ...item, [field]: value } : item
)
);
};

const calculateLineTotal = (item: LineItem) => {
return item.quantity \* item.rate;
};

const subtotal = lineItems.reduce((sum, item) => sum + calculateLineTotal(item), 0);
const tax = subtotal \* (taxRate / 100);
const total = subtotal + tax;

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();

    // TODO: Replace with real API call
    toast({
      title: 'Invoice Created (demo)',
      description: `Invoice ${invoiceNumber} has been created. This is a demo action.`,
    });

    navigate('/admin/invoices');

};

const formatCurrency = (amount: number) => {
return new Intl.NumberFormat('en-US', {
style: 'currency',
currency: 'USD',
}).format(amount);
};

return (
<DashboardLayout>
{/_ Back Link _/}
<button
onClick={() => navigate('/admin/invoices')}
className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6" >
<ArrowLeft className="w-4 h-4" />
Back to Invoices
</button>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Create Invoice
        </h1>
        <p className="text-muted-foreground">
          Generate a new invoice for a client
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Client & Project Section */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Client & Project
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select value={client} onValueChange={setClient}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project">Project Name</Label>
                <Input
                  id="project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., Website Redesign"
                  className="bg-secondary border-border"
                />
              </div>
            </div>
          </div>

          {/* Invoice Details Section */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Invoice Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due">Due</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Line Items Section */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Line Items
            </h2>
            <div className="space-y-4">
              {/* Header Row */}
              <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-muted-foreground px-2">
                <div className="col-span-5">Description</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Rate</div>
                <div className="col-span-2">Total</div>
                <div className="col-span-1"></div>
              </div>

              {/* Line Items */}
              {lineItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start p-4 bg-secondary/30 rounded-lg"
                >
                  <div className="md:col-span-5">
                    <Label className="md:hidden text-xs text-muted-foreground mb-1">
                      Description
                    </Label>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        updateLineItem(item.id, 'description', e.target.value)
                      }
                      placeholder="Item description"
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="md:hidden text-xs text-muted-foreground mb-1">
                      Quantity
                    </Label>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 0)
                      }
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="md:hidden text-xs text-muted-foreground mb-1">
                      Rate
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) =>
                        updateLineItem(item.id, 'rate', parseFloat(e.target.value) || 0)
                      }
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center">
                    <Label className="md:hidden text-xs text-muted-foreground mr-2">
                      Total:
                    </Label>
                    <span className="text-foreground font-medium">
                      {formatCurrency(calculateLineTotal(item))}
                    </span>
                  </div>
                  <div className="md:col-span-1 flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLineItem(item.id)}
                      disabled={lineItems.length === 1}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="gold-outline"
                size="sm"
                onClick={addLineItem}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Line Item
              </Button>
            </div>
          </div>

          {/* Totals Section */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Totals
            </h2>
            <div className="max-w-sm ml-auto space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground font-medium">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Tax</span>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={taxRate}
                    onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-20 h-8 text-sm bg-secondary border-border"
                  />
                  <span className="text-muted-foreground">%</span>
                </div>
                <span className="text-foreground font-medium">
                  {formatCurrency(tax)}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between items-center">
                <span className="text-foreground font-semibold text-lg">Total</span>
                <span className="text-primary font-bold text-xl">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/admin/invoices')}
            >
              Cancel
            </Button>
            <Button type="submit" variant="gold">
              Create Invoice
            </Button>
          </div>
        </div>
      </form>
    </DashboardLayout>

);
};

export default AdminInvoiceCreate;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue,
} from '@/components/ui/select';
import { Plus, Eye, Pencil, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// TODO: Replace with real data from API
const mockInvoices = [
{
id: 'INV-1047',
client: 'Smith & Associates',
project: 'Website Redesign',
amount: '$599.00',
status: 'due' as const,
issueDate: 'Dec 18, 2024',
dueDate: 'Jan 18, 2025',
},
{
id: 'INV-1046',
client: 'Green Valley Landscaping',
project: 'Monthly Care',
amount: '$349.00',
status: 'paid' as const,
issueDate: 'Dec 15, 2024',
dueDate: 'Jan 15, 2025',
},
{
id: 'INV-1045',
client: 'Tech Solutions Inc.',
project: 'E-commerce Build',
amount: '$899.00',
status: 'due' as const,
issueDate: 'Dec 12, 2024',
dueDate: 'Jan 12, 2025',
},
{
id: 'INV-1044',
client: "Bella's Bakery",
project: 'Starter Site',
amount: '$199.00',
status: 'paid' as const,
issueDate: 'Dec 10, 2024',
dueDate: 'Jan 10, 2025',
},
{
id: 'INV-1043',
client: 'Downtown Dental',
project: 'SEO Package',
amount: '$499.00',
status: 'overdue' as const,
issueDate: 'Nov 28, 2024',
dueDate: 'Dec 28, 2024',
},
{
id: 'INV-1042',
client: 'Harbor View Restaurant',
project: 'Monthly Care',
amount: '$307.97',
status: 'paid' as const,
issueDate: 'Nov 15, 2024',
dueDate: 'Dec 15, 2024',
},
];

const AdminInvoices = () => {
const navigate = useNavigate();
const [statusFilter, setStatusFilter] = useState('all');
const [searchQuery, setSearchQuery] = useState('');

const filteredInvoices = mockInvoices.filter((invoice) => {
if (statusFilter !== 'all' && invoice.status !== statusFilter) return false;
if (searchQuery) {
const query = searchQuery.toLowerCase();
return (
invoice.id.toLowerCase().includes(query) ||
invoice.client.toLowerCase().includes(query) ||
invoice.project.toLowerCase().includes(query)
);
}
return true;
});

const handleView = (invoiceId: string) => {
navigate(`/dashboard/invoices/${invoiceId}`);
};

const handleEdit = (invoiceId: string) => {
toast({
title: 'Edit Invoice (demo)',
description: `Edit page for ${invoiceId} coming soon.`,
});
};

return (
<DashboardLayout>
{/_ Header _/}

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
<div>
<h1 className="text-3xl font-bold text-foreground mb-2">Invoices</h1>
<p className="text-muted-foreground">
View and manage all invoices
</p>
</div>
<Button
variant="gold"
className="gap-2"
onClick={() => navigate('/admin/invoices/create')} >
<Plus className="w-4 h-4" />
New Invoice
</Button>
</div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32 bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="due">Due</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                  Invoice #
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                  Client Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground hidden lg:table-cell">
                  Project Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                  Amount
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground hidden md:table-cell">
                  Issue Date
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground hidden md:table-cell">
                  Due Date
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-t border-border hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-foreground font-medium">
                      {invoice.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {invoice.client}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden lg:table-cell">
                    {invoice.project}
                  </td>
                  <td className="px-6 py-4 text-foreground font-medium">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge variant={invoice.status}>
                      {invoice.status === 'due'
                        ? 'Due'
                        : invoice.status === 'paid'
                        ? 'Paid'
                        : 'Overdue'}
                    </StatusBadge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
                    {invoice.issueDate}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="gold-outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleView(invoice.id)}
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleEdit(invoice.id)}
                      >
                        <Pencil className="w-4 h-4" />
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No invoices match your search criteria.
          </div>
        )}
      </div>
    </DashboardLayout>

);
};

export default AdminInvoices;
