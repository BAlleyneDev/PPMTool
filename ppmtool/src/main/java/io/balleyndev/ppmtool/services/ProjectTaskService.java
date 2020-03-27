package io.balleyndev.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.balleyndev.ppmtool.domain.Backlog;
import io.balleyndev.ppmtool.domain.ProjectTask;
import io.balleyndev.ppmtool.repositories.BacklogRepository;
import io.balleyndev.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private BacklogRepository backlogRepository;

	@Autowired
	private ProjectTaskRepository projectTaskRepository;

	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		// PTs to be added to a specific project, project != null, BL exists
		// set the BL to PT
		Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
		projectTask.setBacklog(backlog);

		// we want our project sequence to be like this
		// ProjectIdentifier - 1
		// ProjectIdentifier - 2
		// Update the BL Sequence
		Integer BacklogSequence = backlog.getPTSequence();
		BacklogSequence++;

		backlog.setPTSequence(BacklogSequence);

		// Add Sequence to Task
		projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
		projectTask.setProjectIdentifier(projectIdentifier);

		// Initial priority when priority null
		if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
			projectTask.setPriority(3);
		}

		// Initial status when status null
		if (projectTask.getStatus() == null || projectTask.getStatus() == "") {
			projectTask.setStatus("TO_DO");
		}

		return projectTaskRepository.save(projectTask);
	}

}
