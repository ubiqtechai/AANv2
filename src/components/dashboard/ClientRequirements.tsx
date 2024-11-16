import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Search, Filter } from 'lucide-react';

export default function ClientRequirements() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Requirements</h1>
          <p className="mt-2 text-gray-600">Post and manage client requirements</p>
        </div>
        <Button className="flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Requirement
        </Button>
      </header>

      <Card>
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search requirements..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select className="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>All Jurisdictions</option>
                <option>United States</option>
                <option>European Union</option>
                <option>United Kingdom</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No requirements posted</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by posting a new client requirement
            </p>
            <div className="mt-6">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Post Requirement
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}