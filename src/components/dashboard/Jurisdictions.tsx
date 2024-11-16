import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Globe, AlertCircle, FileText, Download } from 'lucide-react';

export default function Jurisdictions() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string | null>(null);

  const jurisdictions = [
    {
      name: 'United States',
      updates: 3,
      lastUpdate: '2024-03-15',
      complianceScore: 98,
    },
    {
      name: 'European Union',
      updates: 5,
      lastUpdate: '2024-03-14',
      complianceScore: 95,
    },
    {
      name: 'United Kingdom',
      updates: 2,
      lastUpdate: '2024-03-13',
      complianceScore: 97,
    },
  ];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Jurisdictions</h1>
          <p className="mt-2 text-gray-600">Monitor compliance and regulatory updates across jurisdictions</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {jurisdictions.map((jurisdiction) => (
          <Card key={jurisdiction.name} className="hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-brand-500" />
                  <h3 className="ml-2 text-lg font-medium text-gray-900">{jurisdiction.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  jurisdiction.complianceScore >= 95 ? 'bg-green-100 text-green-800' :
                  jurisdiction.complianceScore >= 90 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {jurisdiction.complianceScore}% Compliant
                </span>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Recent Updates</span>
                  <span className="text-gray-900 font-medium">{jurisdiction.updates}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="text-gray-900">{jurisdiction.lastUpdate}</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedJurisdiction(jurisdiction.name)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Compliance Updates */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Compliance Updates</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <UpdateItem
            icon={AlertCircle}
            title="New Data Protection Regulation"
            description="Updated guidelines for handling personal data in the EU region"
            date="March 15, 2024"
            jurisdiction="European Union"
          />
          <UpdateItem
            icon={FileText}
            title="Tax Reporting Requirements"
            description="Annual tax reporting requirements updated for US entities"
            date="March 14, 2024"
            jurisdiction="United States"
          />
          <UpdateItem
            icon={AlertCircle}
            title="Financial Services Update"
            description="New regulations affecting financial service providers in the UK"
            date="March 13, 2024"
            jurisdiction="United Kingdom"
          />
        </div>
      </Card>

      {/* Resources Section */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Compliance Resources</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ResourceCard
            title="Compliance Guidelines"
            description="Comprehensive guide to maintaining compliance across jurisdictions"
          />
          <ResourceCard
            title="Regulatory Framework"
            description="Overview of regulatory requirements and standards"
          />
          <ResourceCard
            title="Best Practices"
            description="Industry best practices for regulatory compliance"
          />
        </div>
      </Card>
    </div>
  );
}

function UpdateItem({ icon: Icon, title, description, date, jurisdiction }: {
  icon: any;
  title: string;
  description: string;
  date: string;
  jurisdiction: string;
}) {
  return (
    <div className="px-6 py-4">
      <div className="flex items-start">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-900">{title}</h4>
            <span className="text-sm text-gray-500">{date}</span>
          </div>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
          <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {jurisdiction}
          </span>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
      <Button variant="ghost" size="sm" className="mt-4">
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </div>
  );
}