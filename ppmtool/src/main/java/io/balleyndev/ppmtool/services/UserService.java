package io.balleyndev.ppmtool.services;

import io.balleyndev.ppmtool.Exceptions.UsernameAlreadyExistsException;
import io.balleyndev.ppmtool.domain.User;

public interface UserService {
	public User saveUser(User newUser);
}
