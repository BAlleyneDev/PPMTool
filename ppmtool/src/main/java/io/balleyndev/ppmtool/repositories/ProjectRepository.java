package io.balleyndev.ppmtool.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.balleyndev.ppmtool.domain.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

	Project findByProjectIdentifier(String projectId);

	@Override
	Iterable<Project> findAll();

	Page<Project> findAllByProjectLeader(String user, Pageable pageable);

}
