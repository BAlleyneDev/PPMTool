package io.balleyndev.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.balleyndev.ppmtool.Exceptions.ProjectIdException;
import io.balleyndev.ppmtool.domain.Backlog;
import io.balleyndev.ppmtool.domain.Project;
import io.balleyndev.ppmtool.repositories.BacklogRepository;
import io.balleyndev.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private BacklogRepository backlogRepository;

	public Project saveOrUpdateProject(Project project) {

		try {
			String projectIDUP = project.getProjectIdentifier().toUpperCase();
			project.setProjectIdentifier(projectIDUP);

			if (project.getId() == null) {
				Backlog backlog = new Backlog();
				project.setBacklog(backlog);
				backlog.setProject(project);
				backlog.setProjectIdentifier(projectIDUP);
			}

			if (project.getId() != null) {
				project.setBacklog(backlogRepository.findByProjectIdentifier(projectIDUP));
			}

			return projectRepository.save(project);

		} catch (Exception e) {
			throw new ProjectIdException(
					"Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exists");
		}

	}

	public Project findProjectByIdentifier(String projectId) {

		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
		if (project == null) {
			throw new ProjectIdException("Project ID '" + projectId + "' does not exist");
		}

		return project;
	}

	public Iterable<Project> findAllProjects() {
		return projectRepository.findAll();
	}

	public void deleteProjectByIdentifier(String projectId) {
		Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

		if (project == null) {
			throw new ProjectIdException("Cannot Project with ID");
		}

		projectRepository.delete(project);
	}

	public void ftyfyt() {

	}

}
