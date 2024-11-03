import React from 'react';
import { EmployeeCard } from './EmployeeCard';
import { ConnectorLine } from './ConnectorLine';
import { Team } from '../data/mockData';

interface TeamSectionProps {
  teams: Team[];
  hasManagerAbove?: boolean;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  teams,
  hasManagerAbove = false,
}) => {
  const gapBetweenEmployees = 96;

  return (
    <div className="flex gap-24 justify-center">
      {teams.map((team) => (
        <div key={team.id} className="flex flex-col items-center">
          {/* Manager */}
          <EmployeeCard
            employee={team.manager}
            hasSubordinates={team.manager.employees?.length > 0}
            hasManager={hasManagerAbove}
          />

          {/* Employees */}
          {team.manager.employees && team.manager.employees.length > 0 && (
            <div className="relative">
              {/* Vertical line from manager to horizontal connector */}
              <ConnectorLine
                type="vertical"
                className="absolute top-0 left-1/2 -translate-x-1/2"
                hideStartDot={true}
                hideEndDot={false}
              />

              {/* Horizontal connector for employees with dots */}
              <div className="flex items-center justify-center mt-6">
                <ConnectorLine
                  type="horizontal"
                  length={(team.manager.employees.length - 1) * gapBetweenEmployees}
                  hideStartDot={false}
                  hideEndDot={false}
                />
              </div>

              {/* Vertical lines to employees */}
              <div className="flex gap-96 mt-6">
                {team.manager.employees.map((employee) => (
                  <div key={employee.id} className="flex flex-col items-center">
                    <ConnectorLine
                      type="vertical"
                      hideStartDot={true}
                      hideEndDot={true}
                    />
                    <EmployeeCard
                      employee={employee}
                      hasManager={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};