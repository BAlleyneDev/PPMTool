package io.balleyndev.ppmtool.Exceptions;

public class ProjectAttributeNotFoundResponse {
	private String projectAttribute;

	public ProjectAttributeNotFoundResponse(String projectAttribute) {
		this.projectAttribute = projectAttribute;
	}

	public String getProjectAttribute() {
		return projectAttribute;
	}

	public void setProjectAttribute(String projectAttribute) {
		this.projectAttribute = projectAttribute;
	}

}
