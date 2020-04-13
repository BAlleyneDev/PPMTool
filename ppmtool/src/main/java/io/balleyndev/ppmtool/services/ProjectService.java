package io.balleyndev.ppmtool.services;

import org.springframework.data.domain.Page;

import io.balleyndev.ppmtool.domain.Project;

public interface ProjectService {
	public Project saveOrUpdateProject(Project project, String username);

	public Project findProjectByIdentifier(String projectId, String username);

	public Page<Project> findAllProjects(String username, Integer page, String sortBy, String direction);

	public void deleteProjectByIdentifier(String projectId, String username);

}
