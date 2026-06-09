variable "region" {
    description = "it is the region for the vpc instance and other resources"
    type = string
}

variable "env" {
    description = "it is the environment for the resources"
    type = string
}

variable "vpc_cidr" {
    description = "it is the cidr block range for the vpc"
    type = string
}

